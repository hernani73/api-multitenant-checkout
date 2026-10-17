import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from './core/errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((
  error: Error, 
  _request: Request, 
  response: Response, 
  _next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error('🚨 Falha interna não tratada no servidor:', error);

  return response.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno inesperado no servidor.'
  });
});

export { app };
