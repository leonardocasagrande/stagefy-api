import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';

interface IListFinishedProfessionalEventsServiceRequest {
  id: string;
}

@injectable()
class ListFinishedProfessionalEventsServiceService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    id,
  }: IListFinishedProfessionalEventsServiceRequest): Promise<Event[]> {
    const events = await this.eventsRepository.findFinishedByProfessionalId(id);
    return events;
  }
}

export default ListFinishedProfessionalEventsServiceService;
