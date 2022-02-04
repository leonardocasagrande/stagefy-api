import IVideoTokenProvider from '@shared/container/providers/VideoTokenProvider/models/IVideoTokenProvider';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { Event } from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IJoinEventRequest {
  eventId: string;
  userId: string;
}

interface IJoinEventResponse {
  event: Event;
  token: string;
}

@injectable()
class JoinEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('VideoTokenProvider')
    private videoTokenProvider: IVideoTokenProvider,
  ) {}

  public async execute({
    eventId,
    userId,
  }: IJoinEventRequest): Promise<IJoinEventResponse> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }
    const token = this.videoTokenProvider.generateToken(eventId, userId);

    const newEvent = await this.eventsRepository.update({
      ...event,
      views: event.views + 1,
      currentViews: event.currentViews + 1,
    });
    return { event: newEvent, token };
  }
}

export default JoinEventService;
