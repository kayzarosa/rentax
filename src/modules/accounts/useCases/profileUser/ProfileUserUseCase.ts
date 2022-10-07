import { inject, injectable } from "tsyringe";

import IUserRepository from "@modules/accounts/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IUserResponseDTO from "@modules/accounts/dtos/IUserResponseDTO";
import UserMap from "@modules/accounts/mapper/UserMap";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found!");
    }

    return UserMap.toDTO(user);
  }
}

export default ProfileUserUseCase;
