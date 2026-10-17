import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { checkoutRoutes } from './checkout.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/checkout', checkoutRoutes);

export { routes };
