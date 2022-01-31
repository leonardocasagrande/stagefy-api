import { IBaseRepository } from '@shared/repositories/interfaces/baseRepository';
import { Like } from '../infra/typeorm/entities/Like';

export default interface ILikesRepository extends IBaseRepository<Like> {
  findByUserAndEvent: (
    userId: string,
    eventId: string,
  ) => Promise<Like | undefined>;
  deleteByEntity: (entity: Like) => Promise<void>;
}
