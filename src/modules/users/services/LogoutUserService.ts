import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  userId: string;
}

@injectable()
export class LogoutUserService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<void> {
    const userTokens = await this.userTokensRepository.findByUser(userId);

    if (!userTokens.length) {
      throw new AppError('Erro ao finalizar sessão', 400);
    }

    await this.userTokensRepository.deleteMany(userTokens);
  }
}
