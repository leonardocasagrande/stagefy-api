import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { Event } from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IStartEventRequest {
  eventId: string;
  userId: string;
}

@injectable()
class StartEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    eventId,
    userId,
  }: IStartEventRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }
    if (event.professional.user.id !== userId) {
      throw new AppError('Usuario não permitido', 400);
    }
    if (event.channelName !== null) {
      throw new AppError('Evento já iniciado', 400);
    }
    const newEvent = await this.eventsRepository.update({
      ...event,
      channelName: eventId,
    });
    return newEvent;
  }
}

export default StartEventService;
