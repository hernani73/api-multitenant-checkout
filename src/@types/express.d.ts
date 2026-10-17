import { Tenant } from '../tenants/models/tenant';

declare global {
  namespace Express {
    interface Request {
        tenant?: {
        id: string;
        name: string;
        slug: string;
        stripeAccountId?: string; 
      };

      userId?: string;
    }
  }
}
