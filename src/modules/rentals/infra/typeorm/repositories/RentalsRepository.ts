import { IsNull, Repository } from "typeorm";
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
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    });

    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });

    return openByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { id: id } });

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentalUser = await this.repository.find({
      where: { user_id: user_id },
      relations: ["car"]
    });

    return rentalUser;
  }
}

export default RentalsRepository;
