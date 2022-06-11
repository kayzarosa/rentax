import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserUseCase from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, username, driver_license } = request.body;

    const createUserUserCase = container.resolve(CreateUserUseCase);

    await createUserUserCase.execute({
      name,
      email,
      password,
      username,
      driver_license,
    });

    return response.status(201).send();
  }
}

export default CreateUserController;
