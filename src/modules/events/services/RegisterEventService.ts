import IProfessionalsRepository from '@modules/users/repositories/IProfessionalsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';
import { Event } from './../infra/typeorm/entities/Event';

interface IRegisterEventRequest {
  name: string;
  image: Express.Multer.File;
  professionalId: string;
  date: Date;
}

@injectable()
export default class RegisterEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('ProfessionalsRepository')
    private professionalsRepository: IProfessionalsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    image,
    professionalId,
    date,
  }: IRegisterEventRequest): Promise<Event> {
    if (date < new Date()) {
      throw new AppError('Data do evento não pode ser no passado', 400);
    }

    const professional = await this.professionalsRepository.findById(
      professionalId,
    );

    if (!professional) {
      throw new AppError('Streamer não encontrado', 400);
    }

    if (!professional.accepted) {
      throw new AppError('Streamer não aceito', 400);
    }

    const url = await this.storageProvider.saveFile(image);
    const event = await this.eventsRepository.create({
      name,
      date,
      views: 0,
      professional,
      image: url,
    });

    const newEvent = await this.eventsRepository.save(event);
    return newEvent;
  }
}
