import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";
import IUserRepository from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(user: ICreateUserDTO): Promise<void> {
    const newUser = new User();

    Object.assign(newUser, user);

    this.users.push(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

}

export default UserRepositoryInMemory;
