import { Failure } from '@shared/errors';

export enum ApplicationError {
  InternalServerError = 'InternalServerError',
}

export const internalServerError = (
  error: Error,
): Failure<ApplicationError.InternalServerError> => {
  const defaultErrorMessage = 'Erro interno do servidor';
  const errorMessage = error.stack ? error.stack : defaultErrorMessage;

  const reason =
    process.env.NODE_ENV === 'prod' ? defaultErrorMessage : errorMessage;

  return {
    type: ApplicationError.InternalServerError,
    reason,
  };
};
