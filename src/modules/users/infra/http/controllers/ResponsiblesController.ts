import RegisterResponsibleService from '@modules/users/services/RegisterResponsibleService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResponsiblesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createResponsible = container.resolve(RegisterResponsibleService);

    const responsible = await createResponsible.execute(request.body);

    return response.status(201).json(classToClass(responsible));
  }
}
