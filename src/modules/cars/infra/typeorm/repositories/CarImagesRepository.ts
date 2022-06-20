import { Repository } from "typeorm";
import AppDataSource from "@database/ormconfig";

import ICreateCarImagesDTO from "@modules/cars/dtos/ICreateCarImagesDTO";
import ICarImagesRepository from "@modules/cars/repositories/ICarImagesRepository";

import CarImage from "../entities/CarImage";

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }
  
  async create(dataCarImage: ICreateCarImagesDTO): Promise<CarImage> {
    const carImage = this.repository.create(dataCarImage);

    await this.repository.save(carImage);

    return carImage;
  }
}

export default CarImagesRepository;
