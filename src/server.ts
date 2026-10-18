import { app } from './app';
import { env } from './core/config/env';

const PORT = process.env.PORT || env.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor SaaS Multitenant rodando em modo [${env.nodeEnv || 'production'}]`);
  console.log(`🔌 Endpoint Base disponível em: http://localhost:${PORT}`);
});
