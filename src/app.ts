import 'express-async-errors/index.js'; 
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from './core/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Middleware global de tratamento de erros corrigido
app.use((
  error: Error, 
  _request: Request, 
  response: Response, 
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
    return;
  }

  console.error('🚨 Falha interna não tratada no servidor:', error);

  response.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno inesperado no servidor.'
  });
});

export { app };
