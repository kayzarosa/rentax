import ISpecificatiosRepository from "../../repositories/ISpecificatiosRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificatiosRepository) {}

  execute({ name, description }: IRequest) {
    const specificationalreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationalreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationsRepository.create({ name, description });
  }
}
