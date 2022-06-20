import { In, Repository } from "typeorm";
import AppDataSource from "@database/ormconfig";

import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import ISpecificatiosRepository from "@modules/cars/repositories/ISpecificatiosRepository";
import Specification from "../entities/Specification";

export default class SpecificatiosRepository
  implements ISpecificatiosRepository
{
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: { name: name },
    });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.find({
      where: { id: In(ids) },
    });

    return specifications;
  }
}
