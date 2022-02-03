import AppError from '@shared/errors/appError';
import { container, inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IPasswordResetTokenRepository from '../repositories/IPasswordResetTokenRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ValidateForgotPasswordTokenService from './ValidateForgotPasswordTokenService';

interface IRequest {
  email: string;
  code: string;
  password: string;
}

@injectable()
export default class ChangePasswordTokenService {
  constructor(
    @inject('PasswordResetTokenRepository')
    private passwordResetTokenRepository: IPasswordResetTokenRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, code, password }: IRequest) {
    const validateToken = container.resolve(ValidateForgotPasswordTokenService);
    await validateToken.execute({ email, code });
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('Usuario não encontrado');
    const hashedPassword = await this.hashProvider.generateHash(password);
    const newUser = await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
    await this.passwordResetTokenRepository.deleteAllByUserId(user.id);
    return newUser;
  }
}
