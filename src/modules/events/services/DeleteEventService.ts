import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';

interface IDeleteEventRequest {
  eventId: string;
}

@injectable()
class DeleteEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ eventId }: IDeleteEventRequest): Promise<void> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }
    await this.eventsRepository.softDelete(eventId);
  }
}

export default DeleteEventService;
