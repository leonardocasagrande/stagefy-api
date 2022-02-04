import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import LikesController from '../controllers/LikesController';

const likesRouter = Router();
const likesController = new LikesController();

likesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      eventId: Joi.string().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Student, ProfileRoleEnum.Responsible]),
  likesController.create,
);

likesRouter.delete(
  '/:eventId',
  celebrate({
    [Segments.PARAMS]: {
      eventId: Joi.string().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Student, ProfileRoleEnum.Responsible]),
  likesController.delete,
);

likesRouter.get(
  '/:eventId',
  celebrate({
    [Segments.PARAMS]: {
      eventId: Joi.string().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Student, ProfileRoleEnum.Responsible]),
  likesController.getByEventId,
);

export default likesRouter;
