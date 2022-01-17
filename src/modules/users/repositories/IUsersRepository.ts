import { IBaseRepository } from '@shared/repositories/interfaces/baseRepository';
import { User } from '../infra/typeorm/entities/User';

export default interface IUsersRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;
  findByPhone(phone: string): Promise<User | undefined>;
}
