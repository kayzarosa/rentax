import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCategoryUseCase from "./CreateCategoryUseCase";

export default class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategpryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategpryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
