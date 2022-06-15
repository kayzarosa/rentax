import ICreateSpecificationDTO from "../dtos/ICreateSpecificationDTO";
import Specification from "../entities/Specification";

export default interface ISpecificatiosRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
