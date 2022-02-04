import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IPasswordResetTokenRepository from '../repositories/IPasswordResetTokenRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  code: string;
}

@injectable()
export default class ValidateForgotPasswordTokenService {
  constructor(
    @inject('PasswordResetTokenRepository')
    private passwordResetTokenRepository: IPasswordResetTokenRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, code }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('Código inválido');
    const tokens = await this.passwordResetTokenRepository.findByUser(user.id);
    if (!tokens.length) throw new AppError('Código inválido');
    const token = tokens[0];
    if (
      this.dateProvider.isAfter({
        compareDate: token.tokenExpiryDate,
        date: new Date(),
      })
    ) {
      throw new AppError('Código inválido');
    }

    const isEqual = await this.hashProvider.compareHash(code, token.token);
    if (!isEqual) throw new AppError('Código inválido');
  }
}
