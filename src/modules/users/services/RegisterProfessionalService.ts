import IProfessionalsRepository from '@modules/users/repositories/IProfessionalsRepository';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { ProfileRoleEnum } from '../dtos/enum/ProfileRoleEnum';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import { Professional } from './../infra/typeorm/entities/Professional';

interface IRegisterProfessionalRequest {
  name: string;
  artisticName: string;
  birthday: string;
  email: string;
  phone: string;
  zipcode: string;
  bio: string;
  password: string;
  avatar?: string;
}

@injectable()
export default class RegisterProfessionalService {
  constructor(
    @inject('ProfessionalsRepository')
    private professionalsRepository: IProfessionalsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    artisticName,
    birthday,
    email,
    phone,
    zipcode,
    bio,
    password,
    avatar,
  }: IRegisterProfessionalRequest): Promise<Professional> {
    const userWithSameMail = await this.usersRepository.findByEmail(email);

    if (userWithSameMail) {
      throw new AppError('Este email já foi utilizado', 403);
    }

    const userWithSamePhone = await this.usersRepository.findByPhone(phone);

    if (userWithSamePhone) {
      throw new AppError(
        'Este número de telefone já está sendo utilizado',
        403,
      );
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      avatar,
      email,
      password: hashedPassword,
      phone,
      profileRole: ProfileRoleEnum.Professional,
    });

    const professionalRecord = await this.professionalsRepository.create({
      user,
      artisticName,
      bio,
      zipcode,
      birthday,
    });

    const newProfessional = await this.professionalsRepository.save(
      professionalRecord,
    );
    return newProfessional;
  }
}
