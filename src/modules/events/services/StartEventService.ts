import IVideoTokenProvider from '@shared/container/providers/VideoTokenProvider/models/IVideoTokenProvider';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { Event } from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IStartEventRequest {
  eventId: string;
  userId: string;
  streamerPeerId: number;
}

interface IStartEventResponse {
  event: Event;
  token: string;
}

@injectable()
class StartEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('VideoTokenProvider')
    private videoTokenProvider: IVideoTokenProvider,
  ) {}

  public async execute({
    eventId,
    userId,
    streamerPeerId,
  }: IStartEventRequest): Promise<IStartEventResponse> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }
    if (event.professional.user.id !== userId) {
      throw new AppError('Usuario não permitido', 400);
    }
    if (event.startedAt !== null) {
      throw new AppError('Evento já iniciado', 400);
    }
    const token = this.videoTokenProvider.generateToken(eventId, userId);

    const newEvent = await this.eventsRepository.update({
      ...event,
      startedAt: new Date(),
      streamerPeerId,
    });
    return { event: newEvent, token };
  }
}

export default StartEventService;
