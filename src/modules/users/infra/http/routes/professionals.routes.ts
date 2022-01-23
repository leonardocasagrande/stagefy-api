import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfessionalsController from '../controllers/ProfessionalsController';

const professionalsRouter = Router();

const professionalsController = new ProfessionalsController();

professionalsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      artisticName: Joi.string().required(),
      birthday: Joi.string().required(),
      email: Joi.string().email().required().lowercase(),
      phone: Joi.string().required(),
      password: Joi.string().min(8).required(),
      zipcode: Joi.string().required(),
      bio: Joi.string().required(),
    },
  }),
  professionalsController.create,
);

professionalsRouter.post(
  '/:id/accept',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Admin]),
  professionalsController.accept,
);

professionalsRouter.post(
  '/:id/refuse',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Admin]),
  professionalsController.refuse,
);

professionalsRouter.get(
  '/not-accepted',
  ensureAuthenticated([ProfileRoleEnum.Admin]),
  professionalsController.getNotAccepted,
);

professionalsRouter.get(
  '/accepted',
  ensureAuthenticated([ProfileRoleEnum.Admin]),
  professionalsController.getAccepted,
);

export default professionalsRouter;
