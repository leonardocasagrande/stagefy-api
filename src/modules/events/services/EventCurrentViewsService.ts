import IVideoTokenProvider from '@shared/container/providers/VideoTokenProvider/models/IVideoTokenProvider';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { Event } from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IEventCurrentViewsRequest {
  eventId: string;
}

@injectable()
class EventCurrentViewsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    eventId,
  }: IEventCurrentViewsRequest): Promise<number> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }
    if (event.startedAt === null) {
      throw new AppError('Evento não iniciado', 400);
    }
    if (event.finishedAt !== null) {
      throw new AppError('Evento já finalizado', 400);
    }

    return event.currentViews;
  }
}

export default EventCurrentViewsService;
