import { Router } from 'express';
import { CheckoutController } from '../modules/checkout/controllers/checkout-controller';
import { tenantResolver } from '../tenants/middlewares/tenant-resolver';
import { ensureAuthenticated } from '../modules/auth/middlewares/ensure-authenticated';

const checkoutRoutes = Router();
const checkoutController = new CheckoutController();

checkoutRoutes.post(
  '/session', 
  tenantResolver, 
  ensureAuthenticated, 
  checkoutController.createSession
);

export { checkoutRoutes };
