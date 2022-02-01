import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { IBaseRepository } from '@shared/repositories/interfaces/baseRepository';

export interface IFindWithTermAndProfessionalIdProps {
  term?: string;
  professionalId?: string;
}

export default interface IEventsRepository extends IBaseRepository<Event> {
  findWithTermAndProfessionalId: ({
    term,
    professionalId,
  }: IFindWithTermAndProfessionalIdProps) => Promise<Event[]>;
  findOngoingWithTerm: (term?: string) => Promise<Event[]>;
  findNotStartedByProfessionalId: (id: string) => Promise<Event[]>;
}
