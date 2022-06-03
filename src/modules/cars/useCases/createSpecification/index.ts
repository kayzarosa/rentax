import SpecificatiosRepository from "../../repositories/implementations/SpecificatiosRepository";
import CreateSpecificationController from "./CreateSpecificationController";
import CreateSpecificationUseCase from "./CreateSpecificationUseCase";

const specificationsRepository = new SpecificatiosRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
);
export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);
