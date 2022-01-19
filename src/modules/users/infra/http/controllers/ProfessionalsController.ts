import RegisterProfessionalService from '@modules/users/services/RegisterProfessionalService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfessionalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProfessional = container.resolve(RegisterProfessionalService);

    const professional = await createProfessional.execute(request.body);

    return response.status(201).json(professional);
  }
}
