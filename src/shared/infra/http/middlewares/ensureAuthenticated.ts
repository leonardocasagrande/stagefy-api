import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/appError';
import authConfig from '@config/auth';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  user_profile_role: ProfileRoleEnum;
  email?: string;
}

export default function ensureAuthenticated(
  authorized_roles: ProfileRoleEnum[] = [],
) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const usersRepository = new UsersRepository();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new AppError('Token de autenticação inexistente.', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret_token);

      if (!decoded) {
        throw new AppError('Token de autenticação inválido.', 401);
      }

      const { sub, user_profile_role } = decoded as ITokenPayload;

      // check if user exists
      const user = await usersRepository.findById(sub);

      if (!user || !user.isActive) {
        throw new AppError('Token de autenticação inválido.', 401);
      }

      // Checking if user has authorization by your profile_role
      if (authorized_roles.length > 0) {
        const checkAuthorization = authorized_roles.find(
          role => role === user_profile_role,
        );

        if (!checkAuthorization) {
          throw new AppError('Você não tem acesso a essa rota.', 401);
        }
      }

      request.user = {
        id: sub,
      };

      return next();
    } catch (error) {
      console.log(error);
      throw new AppError('Token de autenticação inválido.', 401);
    }
  };
}
