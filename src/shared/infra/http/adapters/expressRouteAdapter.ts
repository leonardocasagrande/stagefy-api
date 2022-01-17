import { IController } from '@shared/presentation/protocols';
import { Request, Response } from 'express';

export const adaptRoute = (makeController: () => IController) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      user: req.user,
    };

    const controller = makeController();
    const { statusCode, body } = await controller.handle(request);

    const json =
      statusCode < 399
        ? body
        : {
            status: 'error',
            type: process.env.NODE_ENV !== 'prod' ? body.type : undefined,
            message: body.reason,
          };

    res.status(statusCode).json(json);
  };
};
