import { Express } from 'express';
import helmet from 'helmet';

export const setupHeaders = (app: Express): void => {
  app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

  app.disable('x-powered-by');
};
