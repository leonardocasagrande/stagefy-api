import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ResponsiblesController from '../controllers/ResponsiblesController';

const responsiblesRouter = Router();

const responsiblesController = new ResponsiblesController();

responsiblesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  responsiblesController.create,
);

export default responsiblesRouter;
