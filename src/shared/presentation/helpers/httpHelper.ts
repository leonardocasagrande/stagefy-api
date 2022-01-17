/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Failure } from '@shared/errors';
import { internalServerError } from '../errors/applicationErrors';
import { HttpResponse } from '../protocols';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: {},
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const badRequest = (error: Failure<any>): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const conflict = (error: Failure<any>): HttpResponse => ({
  statusCode: 409,
  body: error,
});

export const unprocessableEntity = (error: Failure<any>): HttpResponse => ({
  statusCode: 422,
  body: error,
});

export const forbidden = (error: Failure<any>): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const notFound = (error: Failure<any>): HttpResponse => ({
  statusCode: 404,
  body: error,
});

export const unauthorized = (error: Failure<any>): HttpResponse => ({
  statusCode: 401,
  body: error,
});

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: 500,
  body: internalServerError(error as Error),
});
