import DeleteLikeService from '@modules/events/services/DeleteLikeService';
import GetLikeService from '@modules/events/services/GetLikeService';
import RegisterLikeService from '@modules/events/services/RegisterLikeService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LikesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createLike = container.resolve(RegisterLikeService);

    const userId = request.user!.id;

    const { eventId } = request.body;

    const like = await createLike.execute({
      userId,
      eventId,
    });

    return response.status(201).json(classToClass({ like }));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteEvent = container.resolve(DeleteLikeService);

    await deleteEvent.execute({
      eventId: request.params.eventId,
      userId: request.user!.id,
    });

    return response.status(204).json();
  }

  public async getByEventId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getLike = container.resolve(GetLikeService);

    const { eventId } = request.params;

    const event = await getLike.execute({
      eventId,
      userId: request.user!.id,
    });

    return response.status(200).json(classToClass(event));
  }
}
