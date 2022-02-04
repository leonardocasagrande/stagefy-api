import AppError from '@shared/errors/appError';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { inject, injectable } from 'tsyringe';
import { ProfileRoleEnum } from '../dtos/enum/ProfileRoleEnum';
import { User } from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRegisterUserRequest {
  profileRole: ProfileRoleEnum;
  name: string;
  email: string;
  password: string;
  phone?: string;
}

@injectable()
export default class RegisterUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    profileRole,
    phone,
  }: IRegisterUserRequest): Promise<User> {
    const userWithSameMail = await this.usersRepository.findByEmail(email);

    if (userWithSameMail) {
      throw new AppError('Este email já foi utilizado', 403);
    }
    if (phone) {
      const userWithSamePhone = await this.usersRepository.findByPhone(phone);

      if (userWithSamePhone) {
        throw new AppError(
          'Este número de telefone já está sendo utilizado',
          403,
        );
      }
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const userRecord = await this.usersRepository.create({
      profileRole,
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const newUser = await this.usersRepository.save(userRecord);
    return newUser;
  }
}
