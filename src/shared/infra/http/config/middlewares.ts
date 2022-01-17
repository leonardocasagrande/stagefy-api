import { Express, json } from 'express';
import { corsSetup } from '../middlewares/cors';

export const setupMiddlewares = (app: Express): void => {
  app.use(corsSetup);
  app.use(json());

  app.use((req, res, next) => {
    res.type('json');
    next();
  });
};
