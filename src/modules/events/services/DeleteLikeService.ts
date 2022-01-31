import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import ILikesRepository from '../repositories/ILikesRepository';

interface IDeleteLikeRequest {
  eventId: string;
  userId: string;
}

@injectable()
class DeleteLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository,
  ) {}

  public async execute({ eventId, userId }: IDeleteLikeRequest): Promise<void> {
    const like = await this.likesRepository.findByUserAndEvent(userId, eventId);
    if (!like) {
      throw new AppError('Like não encontrado', 404);
    }
    await this.likesRepository.deleteByEntity(like);
  }
}

export default DeleteLikeService;
