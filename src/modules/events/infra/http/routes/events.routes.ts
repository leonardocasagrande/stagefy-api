import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import EventsController from '../controllers/EventsController';
import multerErrorHandler from '../middlewares/multerErrorHandler';
import multer from 'multer';
import uploadConfig from '@config/upload';

const eventsRouter = Router();
const eventsController = new EventsController();
const upload = multer(uploadConfig.multer);

eventsRouter.post(
  '/',
  (request, response, next) => {
    multerErrorHandler({
      upload: upload.single('image'),
      request,
      response,
      next,
    });
  },
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      professionalId: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Admin]),
  eventsController.create,
);

eventsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      term: Joi.string().allow(null, ''),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Admin]),
  eventsController.list,
);

eventsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Admin]),
  eventsController.delete,
);

eventsRouter.get(
  '/not-started',
  ensureAuthenticated([ProfileRoleEnum.Professional]),
  eventsController.listByProfessional,
);

eventsRouter.post(
  '/:id/start',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated([ProfileRoleEnum.Professional]),
  eventsController.start,
);

export default eventsRouter;
