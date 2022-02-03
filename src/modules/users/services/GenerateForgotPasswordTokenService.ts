import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IPasswordResetTokenRepository from '../repositories/IPasswordResetTokenRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GenerateForgotPasswordTokenService {
  constructor(
    @inject('PasswordResetTokenRepository')
    private passwordResetTokenRepository: IPasswordResetTokenRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      const digit = Math.floor(
        Math.random() * (9999 - 1000 + 1) + 1000,
      ).toString();
      const hashedDigit = await this.hashProvider.generateHash(digit);
      await this.passwordResetTokenRepository.deleteAllByUserId(user.id);
      const entity = await this.passwordResetTokenRepository.create({
        token: hashedDigit,
        tokenExpiryDate: this.dateProvider.addDays(1),
        user,
      });
      await this.passwordResetTokenRepository.save(entity);

      const forgotPassword = path.resolve(
        __dirname,
        '..',
        'views',
        'forgot-password.hbs',
      );

      await this.mailProvider.sendMail({
        subject: 'RECUPERAÇÃO DE SENHA',
        to: {
          email: email,
          name: user.name,
        },
        templateData: {
          file: forgotPassword,
          variables: {
            name: user.name,
            code: digit,
          },
        },
      });
    }
  }
}

export default GenerateForgotPasswordTokenService;
