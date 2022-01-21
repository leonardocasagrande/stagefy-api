import { inject, injectable } from 'tsyringe';
import IProfessionalsRepository from '../repositories/IProfessionalsRepository';
import { Professional } from '../infra/typeorm/entities/Professional';

@injectable()
class ListNotAcceptedProfessionalsService {
  constructor(
    @inject('ProfessionalsRepository')
    private professionalsRepository: IProfessionalsRepository,
  ) {}

  public async execute(): Promise<Professional[]> {
    const professionals =
      await this.professionalsRepository.findAllNotAccepted();
    return professionals;
  }
}

export default ListNotAcceptedProfessionalsService;
