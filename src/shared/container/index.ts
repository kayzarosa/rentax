import { container } from "tsyringe";

import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

import ISpecificatiosRepository from "@modules/cars/repositories/ISpecificatiosRepository";
import SpecificatiosRepository from "@modules/cars/infra/typeorm/repositories/SpecificatiosRepository";

import IUserRepository from "@modules/accounts/repositories/IUserRepository";
import UserRepository from "@modules/accounts/infra/typeorm/repositories/UserRepository";

import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificatiosRepository>(
  "SpecificatiosRepository",
  SpecificatiosRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);