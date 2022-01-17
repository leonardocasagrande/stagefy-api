import { container } from 'tsyringe';
import { Request, Response } from 'express';
import RegisterUserService from '@modules/users/services/RegisterUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(RegisterUserService);

    const user = await createUser.execute(request.body);

    return response.status(201).json(user);
  }
}
