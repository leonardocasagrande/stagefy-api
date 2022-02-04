import { container } from 'tsyringe';
import { Request, Response } from 'express';
import RegisterUserService from '@modules/users/services/RegisterUserService';
import { classToClass } from 'class-transformer';
import GenerateForgotPasswordTokenService from '@modules/users/services/GenerateForgotPasswordTokenService';
import ValidateForgotPasswordTokenService from '@modules/users/services/ValidateForgotPasswordTokenService';
import ChangePasswordTokenService from '@modules/users/services/ChangePasswordTokenService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(RegisterUserService);

    const user = await createUser.execute(request.body);

    return response.status(201).json(classToClass(user));
  }

  public async forgotPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const forgotPassword = container.resolve(
      GenerateForgotPasswordTokenService,
    );

    await forgotPassword.execute(request.body.email);

    return response.status(201).json();
  }

  public async validateToken(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const validateToken = container.resolve(ValidateForgotPasswordTokenService);
    const { email, code } = request.body;
    await validateToken.execute({ email, code });

    return response.status(201).json();
  }

  public async changePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const changePassword = container.resolve(ChangePasswordTokenService);
    const { email, code, password } = request.body;
    const user = await changePassword.execute({ email, code, password });

    return response.status(201).json(classToClass(user));
  }
}
