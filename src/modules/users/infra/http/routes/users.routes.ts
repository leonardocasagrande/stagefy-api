import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const usersRouter = Router();

const userController = new UserController();

const profileRoleValidValues = [
  ProfileRoleEnum.Responsible,
  ProfileRoleEnum.Student,
  ProfileRoleEnum.Professional,
  ProfileRoleEnum.Admin,
];

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      profileRole: Joi.string()
        .default(ProfileRoleEnum.Student)
        .valid(...Object.values(profileRoleValidValues)),
      name: Joi.string().required(),
      email: Joi.string().email().required().lowercase(),
      password: Joi.string().min(8).required(),
      phone: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRouter.post(
  '/forgot-password',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required().lowercase(),
    },
  }),
  userController.forgotPassword,
);
usersRouter.post(
  '/validate-token',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required().lowercase(),
      code: Joi.string().required(),
    },
  }),
  userController.validateToken,
);

usersRouter.post(
  '/change-password-token',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required().lowercase(),
      code: Joi.string().required(),
      password: Joi.string().required().min(8),
    },
  }),
  userController.changePassword,
);

export default usersRouter;
