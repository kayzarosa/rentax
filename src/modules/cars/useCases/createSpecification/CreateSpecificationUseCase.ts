import AppError from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";

import ISpecificatiosRepository from "@modules/cars/repositories/ISpecificatiosRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificatiosRepository")
    private specificationsRepository: ISpecificatiosRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationalreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationalreadyExists) {
      throw new AppError("Specification already exists!");
    }

    await this.specificationsRepository.create({ name, description });
  }
}
