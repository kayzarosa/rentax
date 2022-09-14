import AppError from "@shared/errors/AppError";

import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import UserRepositoryInMemory from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      email: "user@test.com",
      password: "123456",
      name: "User Test",
      driver_license: "123456",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect."));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      email: "user@test.com",
      password: "123456",
      name: "User Test",
      driver_license: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect."));
  });
});
