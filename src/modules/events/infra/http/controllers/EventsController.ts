import DeleteEventService from '@modules/events/services/DeleteEventService';
import EndEventService from '@modules/events/services/EndEventService';
import EventCurrentViewsService from '@modules/events/services/EventCurrentViewsService';
import JoinEventService from '@modules/events/services/JoinEventService';
import LeaveEventService from '@modules/events/services/LeaveEventService';
import ListEventService from '@modules/events/services/ListEventService';
import ListFutureProfessionalEventsService from '@modules/events/services/ListFutureProfessionalEventsService';
import ListOngoingEventService from '@modules/events/services/ListOngoingEventService';
import PreviewEventService from '@modules/events/services/PreviewEventService';
import RegisterEventService from '@modules/events/services/RegisterEventService';
import StartEventService from '@modules/events/services/StartEventService';
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

    await deleteEvent.execute({ eventId: request.params.id });

    return response.status(204).json();
  }

  public async start(request: Request, response: Response): Promise<Response> {
    const startEvent = container.resolve(StartEventService);

    const { streamerPeerId } = request.body;

    const event = await startEvent.execute({
      eventId: request.params.id,
      userId: request.user!.id,
      streamerPeerId,
    });

    return response.status(200).json(classToClass(event));
  }

  public async currentViews(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const eventCurrentViews = container.resolve(EventCurrentViewsService);

    const currentViews = await eventCurrentViews.execute({
      eventId: request.params.id,
    });

    return response.status(200).json({ currentViews });
  }

  public async preview(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const previewEvent = container.resolve(PreviewEventService);
    const token = await previewEvent.execute({
      eventId: request.params.id,
      userId: request.user!.id,
    });

    return response.status(200).json(classToClass({ token }));
  }

  public async end(request: Request, response: Response): Promise<Response> {
    const endEvent = container.resolve(EndEventService);

    const event = await endEvent.execute({
      eventId: request.params.id,
      userId: request.user!.id,
    });

    return response.status(200).json(classToClass(event));
  }

  public async join(request: Request, response: Response): Promise<Response> {
    const joinEvent = container.resolve(JoinEventService);

    const event = await joinEvent.execute({
      eventId: request.params.id,
      userId: request.user!.id,
    });

    return response.status(200).json(classToClass(event));
  }

  public async leave(request: Request, response: Response): Promise<Response> {
    const leaveEvent = container.resolve(LeaveEventService);

    const event = await leaveEvent.execute({
      eventId: request.params.id,
    });

    return response.status(200).json(classToClass(event));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listEvent = container.resolve(ListEventService);

    const { term } = request.query;

    const event = await listEvent.execute({
      term: term ? term.toString() : undefined,
    });

    return response.status(200).json(classToClass(event));
  }

  public async listOngoing(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listEvent = container.resolve(ListOngoingEventService);

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
