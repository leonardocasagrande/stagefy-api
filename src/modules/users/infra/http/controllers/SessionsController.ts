import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import RefreshTokenService from '@modules/users/services/RefreshTokenService';
import { LogoutUserService } from '@modules/users/services/LogoutUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token, refreshToken } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: user, token, refreshToken });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refreshToken = await refreshTokenService.execute(refresh_token);

    return response.json(refreshToken);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const logoutUser = container.resolve(LogoutUserService);

    await logoutUser.execute({
      userId: request!.user!.id,
    });

    return response.status(204).send();
  }
}
