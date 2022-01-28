import AppError from '@shared/errors/appError';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { container, inject, injectable } from 'tsyringe';
import { ProfileRoleEnum } from '../dtos/enum/ProfileRoleEnum';
import { User } from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
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
  constructor() {}

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
    return user;
  }
}
