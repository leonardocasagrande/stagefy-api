import { IBaseRepository } from '@shared/repositories/interfaces/baseRepository';
import { Professional } from '../infra/typeorm/entities/Professional';

export default interface IProfessionalsRepository
  extends IBaseRepository<Professional> {
  findAllNotAccepted(): Promise<Professional[]>;
  findAllAccepted(): Promise<Professional[]>;
  findAcceptedWithTerm: (term?: string) => Promise<Professional[]>;
}
