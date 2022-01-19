/* eslint-disable no-console */
import 'express-async-errors';
import AppError from '@shared/errors/appError';
import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  __: NextFunction,
): Response => {
  const inProdEnvironment = process.env.NODE_ENV === 'PROD';

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.interfaceMessage,
      error:
        process.env.NODE_ENV === 'DEV' ? error.errorDescription : undefined,
    });
  }

  if (isCelebrateError(error)) {
    const values = error.details.values();

    let { message } = values.next().value.details[0];

    message = message.replace('"', '').replace('"', '');

    return response.status(400).json({
      status: 'error',
      type: 'validation',
      message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message:
      process.env.NODE_ENV === 'DEV' ? error : 'Erro interno de servidor.',
  });
};
