import { Express } from 'express';
import { errorHandler } from '../middlewares/errorHandler';

export const setupErrors = (app: Express): void => {
  app.use(errorHandler);
};
