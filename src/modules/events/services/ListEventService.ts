import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';

interface IListEventRequest {
  term?: string;
}

@injectable()
class ListEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ term }: IListEventRequest): Promise<Event[]> {
    const events = await this.eventsRepository.findWithTerm(term);
    return events;
  }
}

export default ListEventService;
