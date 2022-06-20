import { Repository } from "typeorm";
import AppDataSource from "@database/ormconfig";

import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import Rental from "../entities/Rental";
import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async create(dataRental: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(dataRental);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ where: { car_id } });

    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({ where: { user_id } });

    return openByUser;
  }
}

export default RentalsRepository;
