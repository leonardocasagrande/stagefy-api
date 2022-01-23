/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as core from '../../../../../../node_modules/@types/express-serve-static-core';

interface IMulterErrorHandlerProps {
  upload: RequestHandler<
    core.ParamsDictionary,
    any,
    any,
    core.Query,
    Record<string, any>
  >;
  request: Request;
  response: Response;
  next: NextFunction;
}

function multerErrorHandler({
  response,
  request,
  next,
  upload,
}: IMulterErrorHandlerProps): void {
  upload(request, response, (err: any): Response | void => {
    if (err) {
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          return response.status(400).json({
            status: 'error',
            type: 'validation',
            message:
              'O tamanho da sua imagem excede o limite de 8MB suportado.',
          });
        default:
          return response.status(500).send(err);
      }
    }

    if (!request?.file) {
      return response.status(400).json({
        status: 'error',
        type: 'validation',
        message: 'A imagem é obrigátoria',
      });
    }

    return next();
  });
}

export default multerErrorHandler;
