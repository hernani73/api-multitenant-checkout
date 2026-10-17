import { Request, Response, NextFunction } from 'express';
import { CreateCheckoutSessionService } from '../services/create-checkout-session';
import { AppError } from '../../../core/errors/AppError';

export class CheckoutController {
  public async createSession(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { productName, unitAmountInCents, quantity, successUrl, cancelUrl } = request.body;

      if (!productName || !unitAmountInCents || !quantity || !successUrl || !cancelUrl) {
        throw new AppError(
          'Dados incompletos. Os campos productName, unitAmountInCents, quantity, successUrl e cancelUrl são obrigatórios.',
          400
        );
      }

      if (!request.tenant) {
        throw new AppError('Contexto do inquilino não identificado na requisição.', 500);
      }

      const createCheckoutSessionService = new CreateCheckoutSessionService();
      
      const sessionData = await createCheckoutSessionService.execute({
        productName,
        unitAmountInCents,
        quantity,
        successUrl,
        cancelUrl,
        tenantSlug: request.tenant.slug
      });

      return response.status(201).json(sessionData);
    } catch (error) {
      return next(error);
    }
  }
}
