import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { IBaseRepository } from '@shared/repositories/interfaces/baseRepository';

export default interface IEventsRepository extends IBaseRepository<Event> {
  findWithTerm: (term?: string) => Promise<Event[]>;
}
