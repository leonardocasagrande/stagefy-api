import IProfessionalsRepository from '@modules/users/repositories/IProfessionalsRepository';
import { BaseRepository } from '@shared/repositories/baseRepository';
import { Brackets, getRepository, Not, Repository } from 'typeorm';
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
  public findAllAccepted(): Promise<Professional[]> {
    return this.ormRepository
      .createQueryBuilder('professional')
      .innerJoinAndSelect('professional.user', 'user')
      .where('professional.accepted = true')
      .getMany();
  }
  public async findAcceptedWithTerm(term: string | undefined = '') {
    return this.ormRepository
      .createQueryBuilder('professional')
      .leftJoinAndSelect('professional.user', 'user')
      .where('professional.accepted = true')
      .andWhere(
        new Brackets(qb => {
          qb.where('professional.artisticName ilike :term', {
            term: `%${term}%`,
          }).orWhere('user.name ilike :term');
        }),
      )
      .getMany();
  }
}

export default ProfessionalsRepository;
