import ICreateUserTokenDTO from "../dtos/ICreateUserTokenDTO";
import UserToken from "../infra/typeorm/entities/UserToken";

interface IUsersTokenRepository {
  create(dataUserToken: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(token: string): Promise<UserToken>;
}

export default IUsersTokenRepository;
