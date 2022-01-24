import RegisterProfessionalService from '@modules/users/services/RegisterProfessionalService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AcceptProfessionalService from '@modules/users/services/AcceptProfessionalService';
import ListNotAcceptedProfessionalsService from '@modules/users/services/ListNotAcceptedProfessionalsService';
import RefuseProfessionalService from '@modules/users/services/RefuseProfessionalService';
import ListAcceptedProfessionalsService from '@modules/users/services/ListAcceptedProfessionalsService';
import UpdateProfessionalService from '@modules/users/services/UpdateProfessionalService';
import DeleteProfessionalService from '@modules/users/services/DeleteProfessionalService';

export default class ProfessionalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProfessional = container.resolve(RegisterProfessionalService);

    const professional = await createProfessional.execute(request.body);

    return response.status(201).json(classToClass(professional));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfessional = container.resolve(UpdateProfessionalService);

    const avatar = request.file;

    const professional = await updateProfessional.execute({
      ...request.body,
      id: request.user!.id,
      avatar,
    });

    return response.status(201).json(classToClass(professional));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProfessional = container.resolve(DeleteProfessionalService);

    await deleteProfessional.execute({ id: request.user!.id });

    return response.status(204).json();
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

  public async getAccepted(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAcceptedProfessionals = container.resolve(
      ListAcceptedProfessionalsService,
    );

    const professionals = await listAcceptedProfessionals.execute();

    return response.status(200).json(classToClass(professionals));
  }
}
