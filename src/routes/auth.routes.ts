import { Router } from 'express';
import { AuthController } from '../modules/auth/controllers/auth-controller';
import { tenantResolver } from '../tenants/middlewares/tenant-resolver';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', tenantResolver, authController.login);

export { authRoutes };
