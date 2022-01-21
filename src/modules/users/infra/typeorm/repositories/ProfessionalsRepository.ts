import IProfessionalsRepository from '@modules/users/repositories/IProfessionalsRepository';
import { BaseRepository } from '@shared/repositories/baseRepository';
import { getRepository, Repository } from 'typeorm';
import { Professional } from './../entities/Professional';

class ProfessionalsRepository
  extends BaseRepository<Professional>
  implements IProfessionalsRepository
{
  readonly ormRepository: Repository<Professional>;

  constructor() {
    const repo = getRepository(Professional);

    super(repo);

    this.ormRepository = repo;
  }

  public findAllNotAccepted(): Promise<Professional[]> {
    const professionals = this.ormRepository.find({
      where: { accepted: null },
    });
    return professionals;
  }
}

export default ProfessionalsRepository;
