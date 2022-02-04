import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';
import ILikesRepository from '../repositories/ILikesRepository';
import { Like } from './../infra/typeorm/entities/Like';

interface IRegisterLikeRequest {
  userId: string;
  eventId: string;
}

@injectable()
export default class RegisterLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    userId,
    eventId,
  }: IRegisterLikeRequest): Promise<Like> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado', 400);
    }

    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new AppError('Evento não encontrado', 400);
    }

    const existingLike = await this.likesRepository.findByUserAndEvent(
      userId,
      eventId,
    );

    if (existingLike) {
      throw new AppError('Usuário já deu like nesta live', 400);
    }

    const like = await this.likesRepository.create({
      event,
      user,
    });

    const newLike = await this.likesRepository.save(like);
    return newLike;
  }
}
