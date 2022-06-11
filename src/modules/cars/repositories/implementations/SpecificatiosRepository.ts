import { Repository } from "typeorm";
import AppDataSource from "@database/ormconfig";

import Specification from "../../entities/Specification";
import ISpecificatiosRepository, {
  ICreateSpecificationDTO,
} from "../ISpecificatiosRepository";

export default class SpecificatiosRepository
  implements ISpecificatiosRepository
{
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: { name: name },
    });

    return specification;
  }
}
