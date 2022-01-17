import { routes } from '@shared/infra/http/routes';
import { Express } from 'express';

export const setupRoutes = (app: Express): void => {
  app.use('/status', (req, res) =>
    res.status(200).json({
      message: `Stagefy lives !`,
    }),
  );

  app.use(routes);
};
