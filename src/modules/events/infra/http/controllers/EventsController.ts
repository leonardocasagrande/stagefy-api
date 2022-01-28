import DeleteEventService from '@modules/events/services/DeleteEventService';
import ListEventService from '@modules/events/services/ListEventService';
import ListFutureProfessionalEventsService from '@modules/events/services/ListFutureProfessionalEventsService';
import RegisterEventService from '@modules/events/services/RegisterEventService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class EventsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createEvent = container.resolve(RegisterEventService);

    const { name, professionalId, date } = request.body;

    const image = request.file!;

    const event = await createEvent.execute({
      name,
      professionalId,
      date,
      image,
    });

    return response.status(201).json(classToClass({ event }));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteEvent = container.resolve(DeleteEventService);

    deleteEvent.execute({ eventId: request.params.id });

    return response.status(204).json();
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listEvent = container.resolve(ListEventService);

    const { term } = request.query;

    const event = await listEvent.execute({
      term: term ? term.toString() : undefined,
    });

    return response.status(200).json(classToClass(event));
  }

  public async listByProfessional(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listFuture = container.resolve(ListFutureProfessionalEventsService);

    const id = request.user!.id;

    const events = await listFuture.execute({ id });

    return response.status(200).json(classToClass(events));
  }
}
