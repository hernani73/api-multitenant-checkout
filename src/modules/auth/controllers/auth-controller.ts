import { Request, Response, NextFunction } from 'express';
import { AuthenticateUserService } from '../services/authenticate-user';
import { AppError } from '../../../core/errors/AppError';

export class AuthController {
  public async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, passwordRaw } = request.body;

      if (!email || !passwordRaw) {
        throw new AppError('E-mail e senha são obrigatórios para realizar o login.', 400);
      }

      if (!request.tenant) {
        throw new AppError('Inquilino não identificado no escopo da requisição.', 500);
      }

      const authenticateUserService = new AuthenticateUserService();
      
      const authData = await authenticateUserService.execute({
        email,
        passwordRaw, 
        tenantId: request.tenant.id, 

      return response.status(200).json(authData);
    } catch (error) {
      return next(error);
    }
  }
}
