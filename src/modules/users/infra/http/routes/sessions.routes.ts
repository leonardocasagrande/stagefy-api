import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.get('/', ensureAuthenticated(), (req, res) =>
  res.json({
    status: 'Authenticated',
  }),
);

sessionsRouter.post(
  '/refresh-token',
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().required(),
    },
  }),
  sessionsController.update,
);

sessionsRouter.delete(
  '/',
  ensureAuthenticated([
    ProfileRoleEnum.Student,
    ProfileRoleEnum.Professional,
    ProfileRoleEnum.Responsible,
    ProfileRoleEnum.Admin,
  ]),
  sessionsController.delete,
);

export default sessionsRouter;
