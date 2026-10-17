import { stripe } from '../../../core/config/stripe';
import { AppError } from '../../../core/errors/AppError';

interface CreateCheckoutSessionDTO {
  productName: string;
  unitAmountInCents: number; 
  quantity: number;
  successUrl: string;
  cancelUrl: string;
  tenantSlug: string;     
}

interface CheckoutSessionResponse {
  sessionId: string;
  checkoutUrl: string;
}

export class CreateCheckoutSessionService {
  public async execute({
    productName,
    unitAmountInCents,
    quantity,
    successUrl,
    cancelUrl,
    tenantSlug
  }: CreateCheckoutSessionDTO): Promise<CheckoutSessionResponse> {
    
    if (unitAmountInCents <= 0) {
      throw new AppError('O valor unitário do produto deve ser maior que zero centavos.', 400);
    }

    if (quantity <= 0) {
      throw new AppError('A quantidade de itens deve ser de no mínimo 1 unidade.', 400);
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], // Aceita pagamentos via Cartão de Crédito
        mode: 'payment',                 // Modo de pagamento único (avulso)
        
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: productName,
                metadata: {
                  tenant_slug: tenantSlug,
                },
              },
              unit_amount: unitAmountInCents, 
            },
            quantity: quantity,
          },
        ],
        
        success_url: successUrl,
        cancel_url: cancelUrl,
        
        metadata: {
          tenant_slug: tenantSlug,
        },
      });

      if (!session.url) {
        throw new AppError('Falha crítica ao gerar a URL de pagamento junto ao gateway Stripe.', 500);
      }

      return {
        sessionId: session.id,
        checkoutUrl: session.url,
      };
    } catch (error: any) {
      throw new AppError(`Erro na comunicação com o Stripe: ${error.message || 'Falha inesperada'}`, 502);
    }
  }
}
