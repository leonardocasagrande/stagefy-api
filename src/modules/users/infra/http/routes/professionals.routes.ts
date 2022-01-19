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

export default professionalsRouter;
