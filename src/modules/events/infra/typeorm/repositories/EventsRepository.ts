import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import { BaseRepository } from '@shared/repositories/baseRepository';
import {
  FindConditions,
  getRepository,
  ILike,
  IsNull,
  Like,
  Repository,
} from 'typeorm';
import { Event } from '../entities/Event';

class EventsRepository
  extends BaseRepository<Event>
  implements IEventsRepository
{
  readonly ormRepository: Repository<Event>;

  constructor() {
    const repo = getRepository(Event);

    super(repo);

    this.ormRepository = repo;
  }

  public async findWithTerm(term: string = ''): Promise<Event[]> {
    return this.ormRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.professional', 'professional')
      .leftJoinAndSelect('professional.user', 'user')
      .where('event.name ilike :term', { term: `%${term}%` })
      .orWhere('professional.artisticName ilike :term')
      .orWhere('user.name ilike :term')
      .getMany();
  }

  public findNotStartedByProfessionalId: (id: string) => Promise<Event[]> =
    id => {
      return this.ormRepository.find({
        where: {
          professional: id,
          channelName: IsNull(),
        },
      });
    };
}

export default EventsRepository;
