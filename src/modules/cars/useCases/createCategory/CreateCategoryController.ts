import { Request, Response } from "express";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

export default class CreateCategoryController {
  
  constructor(private createCategpryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.createCategpryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
