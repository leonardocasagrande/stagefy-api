import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { Event } from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

interface ILeaveEventRequest {
  eventId: string;
}

@injectable()
class LeaveEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ eventId }: ILeaveEventRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }

    const newEvent = await this.eventsRepository.update({
      ...event,
      currentViews: event.views - 1 > 0 ? event.views - 1 : 0,
    });
    return newEvent;
  }
}

export default LeaveEventService;
