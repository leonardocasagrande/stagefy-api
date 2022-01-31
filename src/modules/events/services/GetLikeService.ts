import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { inject, injectable } from 'tsyringe';
import { Like } from '../infra/typeorm/entities/Like';
import IEventsRepository from '../repositories/IEventsRepository';
import ILikesRepository from '../repositories/ILikesRepository';

interface IGetLikeRequest {
  eventId: string;
  userId: string;
}

@injectable()
class GetLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository,
  ) {}

  public async execute({
    eventId,
    userId,
  }: IGetLikeRequest): Promise<Like | undefined> {
    const like = await this.likesRepository.findByUserAndEvent(userId, eventId);
    return like;
  }
}

export default GetLikeService;
