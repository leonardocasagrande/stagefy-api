import ILikesRepository from '@modules/events/repositories/ILikesRepository';
import { BaseRepository } from '@shared/repositories/baseRepository';
import { getRepository, Repository } from 'typeorm';
import { Like } from '../entities/Like';

class LikesRepository extends BaseRepository<Like> implements ILikesRepository {
  readonly ormRepository: Repository<Like>;

  constructor() {
    const repo = getRepository(Like);

    super(repo);

    this.ormRepository = repo;
  }
  public findByUserAndEvent: (
    userId: string,
    eventId: string,
  ) => Promise<Like | undefined> = (userId, eventId) => {
    return this.ormRepository.findOne({
      where: {
        user: userId,
        event: eventId,
      },
    });
  };
  public deleteByEntity: (entity: Like) => Promise<void> = async entity => {
    this.ormRepository.remove(entity);
  };
}

export default LikesRepository;
