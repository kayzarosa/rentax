import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import AppError from "@shared/errors/AppError";

import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import IUserRepository from "@modules/accounts/repositories/IUserRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("DayDateProvider")
    private dayDateProvider: IDateProvider,

    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    if (
      this.dayDateProvider.compareIfBefore(
        userToken.expires_date,
        this.dayDateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }

    const user = await this.userRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.userRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export default ResetPasswordUserUseCase;
