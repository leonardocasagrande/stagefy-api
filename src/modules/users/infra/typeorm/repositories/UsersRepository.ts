import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { BaseRepository } from '@shared/repositories/baseRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

class UsersRepository extends BaseRepository<User> implements IUsersRepository {
  readonly ormRepository: Repository<User>;

  constructor() {
    const repo = getRepository(User);

    super(repo);

    this.ormRepository = repo;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          professional: 'user.professional',
        },
      },
    });
    return user;
  }

  public async findByPhone(phone: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { phone },
    });
    return user;
  }
}

export default UsersRepository;
