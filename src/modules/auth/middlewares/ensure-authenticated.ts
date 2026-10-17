import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../../core/config/env';
import { AppError } from '../../../core/errors/AppError';

interface TokenPayload {
  tenantId: string;
  iat: number;
  exp: number;
  sub: string; // ID do Usuário
}

export function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT ausente na requisição.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const { sub: userId, tenantId: tokenTenantId } = decoded as TokenPayload;

    if (!request.tenant) {
      throw new AppError('Contexto do inquilino não foi inicializado.', 500);
    }

    if (tokenTenantId !== request.tenant.id) {
      throw new AppError(
        'Acesso proibido: Este token de autenticação não pertence ao inquilino informado no cabeçalho.',
        403
      );
    }

    request.userId = userId;

    return next();
  } catch (error) {
    throw new AppError('Token JWT inválido ou expirado.', 401);
  }
}
