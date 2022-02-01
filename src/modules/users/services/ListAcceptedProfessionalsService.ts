import { inject, injectable } from 'tsyringe';
import IProfessionalsRepository from '../repositories/IProfessionalsRepository';
import { Professional } from '../infra/typeorm/entities/Professional';

interface IListAcceptedProfessionalsRequest {
  term?: string;
}

@injectable()
class ListAcceptedProfessionalsService {
  constructor(
    @inject('ProfessionalsRepository')
    private professionalsRepository: IProfessionalsRepository,
  ) {}

  public async execute({
    term,
  }: IListAcceptedProfessionalsRequest): Promise<Professional[]> {
    const professionals =
      await this.professionalsRepository.findAcceptedWithTerm(term);
    return professionals;
  }
}

export default ListAcceptedProfessionalsService;
