import RegisterProfessionalService from '@modules/users/services/RegisterProfessionalService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AcceptProfessionalService from '@modules/users/services/AcceptProfessionalService';
import ListNotAcceptedProfessionalsService from '@modules/users/services/ListNotAcceptedProfessionalsService';
import RefuseProfessionalService from '@modules/users/services/RefuseProfessionalService';

export default class ProfessionalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProfessional = container.resolve(RegisterProfessionalService);

    const professional = await createProfessional.execute(request.body);

    return response.status(201).json(classToClass(professional));
  }

  public async accept(request: Request, response: Response): Promise<Response> {
    const acceptProfessional = container.resolve(AcceptProfessionalService);

    await acceptProfessional.execute({ userId: request.params.id });

    return response.status(200).json();
  }

  public async refuse(request: Request, response: Response): Promise<Response> {
    const refuseProfessional = container.resolve(RefuseProfessionalService);

    await refuseProfessional.execute({ userId: request.params.id });

    return response.status(200).json();
  }

  public async getNotAccepted(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listNotAcceptedProfessionals = container.resolve(
      ListNotAcceptedProfessionalsService,
    );

    const professionals = await listNotAcceptedProfessionals.execute();

    return response.status(200).json(classToClass(professionals));
  }
}
