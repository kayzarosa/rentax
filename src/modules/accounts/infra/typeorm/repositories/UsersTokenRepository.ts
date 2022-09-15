import { Repository } from "typeorm";
import AppDataSource from "@database/ormconfig";

import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";

import UserToken from "../entities/UserToken";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken);
  }

  async create(dataUserToken: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create(dataUserToken);

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserToken> {
    const usersTokens = await this.repository.findOne({
      where: { 
        user_id: user_id, 
        refresh_token: token 
      },
    });

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersTokenRepository;
