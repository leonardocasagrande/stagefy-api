import AppError from '@shared/errors/appError';
import { container, inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import { LogoutUserService } from './LogoutUserService';

interface IDeleteProfessionalRequest {
  id: string;
}

@injectable()
export default class DeleteProfessionalService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IDeleteProfessionalRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Profissional não encontrado', 400);
    }
    await this.usersRepository.softDelete(id);
    const logoutUser = container.resolve(LogoutUserService);
    await logoutUser.execute({ userId: id });
  }
}
