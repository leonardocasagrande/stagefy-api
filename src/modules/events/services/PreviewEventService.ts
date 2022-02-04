import IVideoTokenProvider from '@shared/container/providers/VideoTokenProvider/models/IVideoTokenProvider';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { Event } from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface IPreviewEventRequest {
  eventId: string;
  userId: string;
}

@injectable()
class PreviewEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('VideoTokenProvider')
    private videoTokenProvider: IVideoTokenProvider,
  ) {}

  public async execute({
    eventId,
    userId,
  }: IPreviewEventRequest): Promise<string> {
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
    return token;
  }
}

export default PreviewEventService;
