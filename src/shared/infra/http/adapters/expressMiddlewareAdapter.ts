import { IMiddleware } from '@shared/presentation/protocols/index';
import { Request, Response, NextFunction } from 'express';

export const adaptMiddleware = (makeMiddleware: () => IMiddleware) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      token: req.headers.authorization
        ? req.headers.authorization.split(' ')[1]
        : undefined,
      ...(req.headers || {}),
    };

    const middleware = makeMiddleware();
    const { statusCode, body } = await middleware.handle(request);

    if (statusCode > 399) {
      res.status(statusCode).json({
        status: 'error',
        type: process.env.NODE_ENV !== 'prod' ? body.type : undefined,
        message: body.reason,
      });
    }

    Object.assign(req, body);

    next();
  };
};
