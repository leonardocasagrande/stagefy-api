/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from '@shared/presentation/protocols';

export interface IMiddleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>;
}
