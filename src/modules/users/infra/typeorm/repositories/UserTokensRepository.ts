import { Repository, getRepository } from 'typeorm';

import { BaseRepository } from '@shared/repositories/baseRepository';
import { UserToken } from '../entities/UserTokens';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class UserTokensRepository
  extends BaseRepository<UserToken>
  implements IUserTokensRepository
{
  readonly ormRepository: Repository<UserToken>;

  constructor() {
    const repo = getRepository(UserToken);

    super(repo);

    this.ormRepository = repo;
  }

  public async findByUser(user_id: string): Promise<UserToken[]> {
    const user = await this.find({ where: { user_id } });

    return user;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      refreshToken: token,
    });

    return userToken;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async deleteAllByUserId(userId: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder('user_tokens')
      .delete()
      .where('user_tokens.user_id = :user_id', { userId })
      .execute();
  }

  public async deleteMany(tokens: UserToken[]): Promise<void> {
    const tokensIds = tokens.map(item => item.id);

    await this.ormRepository.delete(tokensIds);
  }
}

export default UserTokensRepository;
