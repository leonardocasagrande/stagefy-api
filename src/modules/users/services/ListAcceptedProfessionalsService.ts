import { inject, injectable } from 'tsyringe';
import IProfessionalsRepository from '../repositories/IProfessionalsRepository';
import { Professional } from '../infra/typeorm/entities/Professional';

@injectable()
class ListAcceptedProfessionalsService {
  constructor(
    @inject('ProfessionalsRepository')
    private professionalsRepository: IProfessionalsRepository,
  ) {}

  public async execute(): Promise<Professional[]> {
    const professionals = await this.professionalsRepository.findAllAccepted();
    return professionals;
  }
}

export default ListAcceptedProfessionalsService;
