import IUserRepository from "modules/accounts/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ avatar_file, user_id }: IRequest) {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export default UpdateUserAvatarUseCase;
