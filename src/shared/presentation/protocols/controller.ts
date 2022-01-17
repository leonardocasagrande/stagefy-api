/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from '@shared/presentation/protocols';

export interface IController<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}

export type LoggedUserData = {
  user: {
    id: string;
    password: string;
  };
};
