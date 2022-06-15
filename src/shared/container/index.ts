import { container } from "tsyringe";

import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import CategoriesRepository from "@modules/cars/infra/repositories/CategoriesRepository";

import ISpecificatiosRepository from "@modules/cars/repositories/ISpecificatiosRepository";
import SpecificatiosRepository from "@modules/cars/infra/repositories/SpecificatiosRepository";

import IUserRepository from "@modules/accounts/repositories/IUserRepository";
import UserRepository from "@modules/accounts/infra/typeorm/repositories/UserRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificatiosRepository>(
  "SpecificatiosRepository",
  SpecificatiosRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
