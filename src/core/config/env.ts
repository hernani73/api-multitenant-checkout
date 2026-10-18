import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const requiredEnvs = ['JWT_SECRET', 'STRIPE_API_KEY'] as const;

for (const envName of requiredEnvs) {
  if (!process.env[envName]) {
    throw new Error(`🚨 Variável de ambiente crucial ausente no seu .env: ${envName}`);
  }
}

export const env = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  stripeApiKey: process.env.STRIPE_API_KEY as string,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};
