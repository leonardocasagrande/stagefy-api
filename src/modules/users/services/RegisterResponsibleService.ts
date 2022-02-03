import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import { container, inject, injectable } from 'tsyringe';
import { ProfileRoleEnum } from '../dtos/enum/ProfileRoleEnum';
import { User } from '../infra/typeorm/entities/User';
import RegisterUserService from './RegisterUserService';

interface IRegisterResponsibleRequest {
  profileRole: ProfileRoleEnum;
  name: string;
  email: string;
  password: string;
  phone: string;
}

@injectable()
export default class RegisterResponsibleService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRegisterResponsibleRequest): Promise<User> {
    const registerUser = container.resolve(RegisterUserService);
    const user = await registerUser.execute({
      name,
      email,
      password,
      profileRole: ProfileRoleEnum.Responsible,
    });
    const responsibleWelcome = path.resolve(
      __dirname,
      '..',
      'views',
      'responsible-welcome.hbs',
    );

    await this.mailProvider.sendMail({
      subject: 'BEM VINDO À STAGEFY!',
      to: {
        email: user.email,
        name: user.name,
      },
      templateData: {
        file: responsibleWelcome,
        variables: {
          name: user.name,
        },
      },
    });
    return user;
  }
}
