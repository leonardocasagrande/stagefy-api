import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { v4 as uuid } from 'uuid';
import AppError from '@shared/errors/appError';

import { User } from '@modules/users/infra/typeorm/entities/User';
import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import { ProfileRoleEnum } from '../dtos/enum/ProfileRoleEnum';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email/Senha inválidos.', 400);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Email/Senha inválidos.', 400);
    }

    if (user.professional && !user.professional.accepted) {
      throw new AppError('Profissional não aceito', 400);
    }

    const {
      secret_token,
      expires_in_token,
      expires_access_token_days,
      expires_refresh_token_days,
    } = authConfig.jwt;

    const token = sign({ user_profile_role: user.profileRole }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = uuid();

    const refresh_token_expiration_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    const access_token_expiration_date = this.dateProvider.addDays(
      expires_access_token_days,
    );

    await this.userTokensRepository.create({
      userId: user.id,
      refreshToken: refresh_token,
      refreshTokenExpirationDate: refresh_token_expiration_date,
      accessTokenExpirationDate: access_token_expiration_date,
    });

    return {
      user,
      token,
      refreshToken: refresh_token,
    };
  }
}

export default AuthenticateUserService;
