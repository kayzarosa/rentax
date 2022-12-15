import UserRepositoryInMemory from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import UsersTokenRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import MailProviderInMemory from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    const user = {
      driver_license: "992971",
      email: "cidlipi@virugi.hk",
      name: "Matthew Atkins",
      password: "1234",
    };

    await userRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toBeCalled();
  });

  it("should not be able to send an email if user not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("cuhovu@sedni.gu")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const userToken = jest.spyOn(usersTokenRepositoryInMemory, "create");

    const user = {
      driver_license: "025856",
      email: "vopmun@puopoled.ie",
      name: "Caleb Kelly",
      password: "1234",
    };

    await userRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(userToken).toBeCalled();
  });
});
