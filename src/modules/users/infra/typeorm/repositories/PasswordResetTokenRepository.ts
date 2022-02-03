import IPasswordResetTokenRepository from '@modules/users/repositories/IPasswordResetTokenRepository';
import { BaseRepository } from '@shared/repositories/baseRepository';
import { getRepository, Repository } from 'typeorm';
import { PasswordResetToken } from '../entities/PasswordResetToken';

class PasswordResetTokenRepository
  extends BaseRepository<PasswordResetToken>
  implements IPasswordResetTokenRepository
{
  readonly ormRepository: Repository<PasswordResetToken>;

  constructor() {
    const repo = getRepository(PasswordResetToken);

    super(repo);

    this.ormRepository = repo;
  }

  public async deleteAllByUserId(userId: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder('password_reset_token')
      .delete()
      .where('password_reset_token.user_id = :user_id', { user_id: userId })
      .execute();
  }

  public async findByUser(userId: string): Promise<PasswordResetToken[]> {
    return this.ormRepository.find({
      where: {
        user: userId,
      },
      order: {
        tokenExpiryDate: 'DESC',
      },
    });
  }
}

export default PasswordResetTokenRepository;
