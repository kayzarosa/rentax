import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import AppError from "@errors/AppError";
import IUserRepository from "@modules/accounts/repositories/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect.");
    }

    const token = sign({}, "8ef86431456bd51035bc4f07f74f0d5b", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export default AuthenticateUserUseCase;
