import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import IProfessionalsRepository from '../repositories/IProfessionalsRepository';
import path from 'path';

interface IRequest {
  userId: string;
}

@injectable()
class AcceptProfessionalService {
  constructor(
    @inject('ProfessionalsRepository')
    private professionalsRepository: IProfessionalsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<void> {
    const professional = await this.professionalsRepository.findById(userId);
    if (!professional) {
      throw new AppError('Usuário não encontrado', 400);
    }

    if (professional.accepted !== null) {
      throw new AppError('Usuário já foi aceito/recusado', 400);
    }

    const professionalWelcome = path.resolve(
      __dirname,
      '..',
      'views',
      'professional-welcome.hbs',
    );

    await this.mailProvider.sendMail({
      subject: 'BEM VINDO À STAGEFY!',
      to: {
        email: professional.user.email,
        name: professional.artisticName,
      },
      templateData: {
        file: professionalWelcome,
        variables: {
          name: professional.artisticName,
        },
      },
    });

    await this.professionalsRepository.save({
      ...professional,
      accepted: true,
    });
    return;
  }
}

export default AcceptProfessionalService;
