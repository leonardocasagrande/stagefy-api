import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';

interface IListNotStartedEventsByProfessionalRequest {
  id: string;
}

@injectable()
class ListNotStartedEventsByProfessionalService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    id,
  }: IListNotStartedEventsByProfessionalRequest): Promise<Event[]> {
    const events = await this.eventsRepository.findNotStartedByProfessionalId(
      id,
    );
    return events;
  }
}

export default ListNotStartedEventsByProfessionalService;
