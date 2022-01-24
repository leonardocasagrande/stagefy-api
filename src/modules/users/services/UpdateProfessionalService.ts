import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IProfessionalsRepository from '@modules/users/repositories/IProfessionalsRepository';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { ProfileRoleEnum } from '../dtos/enum/ProfileRoleEnum';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import { Professional } from './../infra/typeorm/entities/Professional';

interface IUpdateProfessionalRequest {
  id: string;
  name: string;
  artisticName: string;
  birthday: string;
  email: string;
  phone: string;
  bio: string;
  avatar?: Express.Multer.File;
}

@injectable()
export default class UpdateProfessionalService {
  constructor(
    @inject('ProfessionalsRepository')
    private professionalsRepository: IProfessionalsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    name,
    artisticName,
    birthday,
    email,
    phone,
    bio,
    avatar,
  }: IUpdateProfessionalRequest): Promise<Professional> {
    const userWithSameMail = await this.usersRepository.findByEmailExceptId(
      email,
      id,
    );

    if (userWithSameMail) {
      throw new AppError('Este email já foi utilizado', 403);
    }

    const userWithSamePhone = await this.usersRepository.findByPhoneExceptId(
      phone,
      id,
    );

    if (userWithSamePhone) {
      throw new AppError(
        'Este número de telefone já está sendo utilizado',
        403,
      );
    }

    const professional = await this.professionalsRepository.findById(id);

    if (!professional) {
      throw new AppError('Profissional não encontrado', 400);
    }

    if (avatar) {
      professional.user.avatar = await this.storageProvider.saveFile(avatar);
    }

    professional.artisticName = artisticName;
    professional.bio = bio;
    professional.birthday = birthday;
    professional.user.name = name;
    professional.user.phone = phone;
    professional.user.email = email;

    const newProfessional = await this.professionalsRepository.save(
      professional,
    );
    return newProfessional;
  }
}
