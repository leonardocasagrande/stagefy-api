import { IBaseRepository } from '@shared/repositories/interfaces/baseRepository';
import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserTokens';

export default interface IUserTokensRepository
  extends IBaseRepository<UserToken> {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;
  deleteMany(tokens: UserToken[]): Promise<void>;
  findByToken(token: string): Promise<UserToken | undefined>;
  findByUser(userId: string): Promise<UserToken[]>;
}
