import { IBaseRepository } from '@shared/repositories/interfaces/baseRepository';
import { PasswordResetToken } from '../infra/typeorm/entities/PasswordResetToken';

export default interface IPasswordResetTokenRepository
  extends IBaseRepository<PasswordResetToken> {
  deleteAllByUserId(userId: string): Promise<void>;
  findByUser(userId: string): Promise<PasswordResetToken[]>;
}
