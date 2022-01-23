import eventsRouter from '@modules/events/infra/http/routes/events.routes';
import professionalsRouter from '@modules/users/infra/http/routes/professionals.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/professionals', professionalsRouter);
routes.use('/events', eventsRouter);

export { routes };
