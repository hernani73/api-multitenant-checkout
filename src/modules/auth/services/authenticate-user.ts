import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../../core/config/env';
import { AppError } from '../../../core/errors/AppError';
import { mockUsersDatabase } from '../models/user';

interface AuthenticateUserDTO {
  email: string;
  passwordRaw: string;
  tenantId: string;
}

interface AuthenticationResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUserService {
  public async execute({ 
    email, 
    passwordRaw, 
    tenantId 
  }: AuthenticateUserDTO): Promise<AuthenticationResponse> {
    
    const user = mockUsersDatabase.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.tenantId === tenantId
    );

    if (!user) {
      throw new AppError('Credenciais inválidas ou usuário não pertence a este inquilino.', 401);
    }

    const passwordMatched = passwordRaw === "123456";
    if (!passwordMatched) {
      throw new AppError('Credenciais inválidas ou usuário não pertence a este inquilino.', 401);
    }

    const token = jwt.sign(
      { 
        tenantId: user.tenantId 
      }, 
      env.jwtSecret, 
      {
        subject: user.id,
        expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'] // Tipagem exata resolvida aqui
      }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
