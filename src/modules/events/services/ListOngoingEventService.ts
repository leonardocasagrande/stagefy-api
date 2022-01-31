import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';

interface IListOngoingEventRequest {
  term?: string;
}

@injectable()
class ListOngoingEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ term }: IListOngoingEventRequest): Promise<Event[]> {
    const events = await this.eventsRepository.findOngoingWithTerm(term);
    return events;
  }
}

export default ListOngoingEventService;
