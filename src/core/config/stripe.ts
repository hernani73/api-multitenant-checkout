import Stripe from 'stripe';
import { env } from './env';

export const stripe = new Stripe(env.stripeApiKey, {
  apiVersion: '2023-10-16' as any,
  appInfo: {
    name: 'SaaS Multitenant Checkout API',
    version: '1.0.0',
  },
});
