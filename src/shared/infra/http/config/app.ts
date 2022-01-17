import express from 'express';
import '@shared/container';
import 'reflect-metadata';
import 'express-async-errors';

import { setupErrors, setupHeaders, setupMiddlewares, setupRoutes } from '.';

const app = express();

setupHeaders(app);
setupMiddlewares(app);
setupRoutes(app);
setupErrors(app);

export { app };
