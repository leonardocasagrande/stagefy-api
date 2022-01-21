import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';
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

export default usersRouter;
