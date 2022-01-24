import { injectable, inject } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/appError';
import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import { User } from '../infra/typeorm/entities/User';

interface IResponse {
  user: User;
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute(refreshToken: string): Promise<IResponse> {
    const {
      expires_refresh_token_days,
      secret_token,
      expires_in_token,
      expires_access_token_days,
    } = authConfig.jwt;

    // Checking token
    const userToken = await this.userTokensRepository.findByToken(refreshToken);

    if (!userToken) {
      throw new AppError('Refresh token não encontrado', 401);
    }

    // Checking user
    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('Usuário não encontrado', 401);
    }

    // checking expiration dates
    const refreshTokenExpired = this.dateProvider.isAfter({
      date: new Date(),
      compareDate: userToken.refreshTokenExpirationDate,
    });

    if (refreshTokenExpired) {
      throw new AppError('Refresh token inválido', 401);
    }

    // Authenticate user
    const token = sign({ user_profile_role: user.profileRole }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    // update refresh_token
    const refreshTokenExpirationDate = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    const accessTokenExpirationDate = this.dateProvider.addDays(
      expires_access_token_days,
    );

    Object.assign(userToken, {
      refresh_token: uuid(),
      refreshTokenExpirationDate,
      accessTokenExpirationDate,
    });

    await this.userTokensRepository.save(userToken);

    return {
      user,
      token,
      refreshToken: userToken.refreshToken,
    };
  }
}

export default RefreshTokenService;
