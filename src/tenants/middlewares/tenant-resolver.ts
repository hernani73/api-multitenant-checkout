import { Request, Response, NextFunction } from 'express';
import { ConnectionManager } from '../connection-manager';
import { AppError } from '../../core/errors/AppError';

export function tenantResolver(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const tenantSlug = request.headers['x-tenant-slug'];

  if (!tenantSlug) {
    throw new AppError(
      "Acesso negado: Identificador do inquilino ('x-tenant-slug') ausente nos headers da requisição.", 
      400
    );
  }

  const slugParsed = String(tenantSlug).trim().toLowerCase();

  try {
    const connectionContext = ConnectionManager.resolveConnection(slugParsed);

    request.tenant = {
      id: connectionContext.tenant.id,
      name: connectionContext.tenant.name,
      slug: connectionContext.tenant.slug,
      stripeAccountId: connectionContext.tenant.stripeAccountId,
    };

    return next();
  } catch (error) {
    return next(error);
  }
}
