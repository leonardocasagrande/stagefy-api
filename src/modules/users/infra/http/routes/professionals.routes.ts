import uploadConfig from '@config/upload';
import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfessionalsController from '../controllers/ProfessionalsController';
import multer from 'multer';
import multerErrorHandler from '../middlewares/multerErrorHandler';

const professionalsRouter = Router();
const upload = multer(uploadConfig.multer);

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

professionalsRouter.put(
  '/',
  (request, response, next) => {
    multerErrorHandler({
      upload: upload.single('avatar'),
      request,
      response,
      next,
    });
  },
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      artisticName: Joi.string().required(),
      birthday: Joi.string().required(),
      email: Joi.string().email().required().lowercase(),
      phone: Joi.string().required(),
      bio: Joi.string().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Professional]),
  professionalsController.update,
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

professionalsRouter.delete(
  '/',
  ensureAuthenticated([ProfileRoleEnum.Professional]),
  professionalsController.delete,
);

export default professionalsRouter;
