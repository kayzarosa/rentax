import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import UserToken from "@modules/accounts/infra/typeorm/entities/UserToken";

import IUsersTokenRepository from "../IUsersTokenRepository";

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private usersTokens: UserToken[] = [];

  async create(dataUserToken: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, dataUserToken);

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserToken> {
    return this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id && userToken.refresh_token === token
    );
  }

  async deleteById(id: string): Promise<void> {
    const indexUserToken = this.usersTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.usersTokens.splice(indexUserToken);
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === token
    );
  }
}

export default UsersTokenRepositoryInMemory;
