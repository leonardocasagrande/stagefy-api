import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';

interface IListEventRequest {
  term?: string;
  userId?: string;
}

@injectable()
class ListEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ term, userId }: IListEventRequest): Promise<Event[]> {
    const events = await this.eventsRepository.findWithTermAndProfessionalId({
      term,
      professionalId: userId,
    });
    return events;
  }
}

export default ListEventService;
