import eventsRouter from '@modules/events/infra/http/routes/events.routes';
import likesRouter from '@modules/events/infra/http/routes/likes.routes';
import professionalsRouter from '@modules/users/infra/http/routes/professionals.routes';
import responsiblesRouter from '@modules/users/infra/http/routes/responsibles.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/professionals', professionalsRouter);
routes.use('/responsibles', responsiblesRouter);
routes.use('/events', eventsRouter);
routes.use('/likes', likesRouter);

export { routes };
