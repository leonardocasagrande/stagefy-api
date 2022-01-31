import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { Event } from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IEndEventRequest {
  eventId: string;
  userId: string;
}

@injectable()
class EndEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ eventId, userId }: IEndEventRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }
    if (event.professional.user.id !== userId) {
      throw new AppError('Usuario não permitido', 400);
    }

    if (!event.startedAt) {
      throw new AppError('Evento não foi iniciado', 404);
    }

    if (event.finishedAt) {
      throw new AppError('Evento já finalizado', 400);
    }
    const newEvent = await this.eventsRepository.update({
      ...event,
      finishedAt: new Date(),
    });
    return newEvent;
  }
}

export default EndEventService;
