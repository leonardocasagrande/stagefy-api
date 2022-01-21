import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import IProfessionalsRepository from '../repositories/IProfessionalsRepository';

interface IRequest {
  userId: string;
}

@injectable()
class AcceptProfessionalService {
  constructor(
    @inject('ProfessionalsRepository')
    private professionalsRepository: IProfessionalsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<void> {
    const professional = await this.professionalsRepository.findById(userId);
    if (!professional) {
      throw new AppError('Usuário não encontrado', 400);
    }

    if (professional.accepted !== null) {
      throw new AppError('Usuário já foi aceito/recusado', 400);
    }

    await this.professionalsRepository.save({
      ...professional,
      accepted: true,
    });
    return;
  }
}

export default AcceptProfessionalService;
