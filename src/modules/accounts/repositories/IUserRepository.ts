import ICreateUserDTO from "../dtos/ICreateUserDTO";

interface IUserRepository {
  create(user: ICreateUserDTO): Promise<void>;
}

export default IUserRepository;
