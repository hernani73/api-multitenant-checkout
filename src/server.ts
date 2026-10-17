import { app } from './app';
import { env } from './core/config/env';

app.listen(env.port, () => {
  console.log(`🚀 Servidor SaaS Multitenant rodando em modo [${env.nodeEnv}]`);
  console.log(`🔌 Endpoint Base disponível em: http://localhost:${env.port}`);
});
