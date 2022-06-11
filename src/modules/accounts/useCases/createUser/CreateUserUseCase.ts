import { inject, injectable } from "tsyringe";

import IUserRepository from "modules/accounts/repositories/IUserRepository";
import ICreateUserDTO from "modules/accounts/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    username,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      email,
      password,
      username,
      driver_license,
    });
  }
}

export default CreateUserUseCase;
