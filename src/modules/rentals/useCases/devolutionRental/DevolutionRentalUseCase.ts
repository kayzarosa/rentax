import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayDateProvider")
    private dayDateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);

    const car = await this.carsRepository.findById(rental.car_id);

    const minimum_daily = 1;

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const dateNow = this.dayDateProvider.dateNow();

    let daily = this.dayDateProvider.compareInDays(
      rental.start_date,
      dateNow
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dayDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      total = delay * car.fine_amount;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dayDateProvider.dateNow();
    rental.total = total;

    await this.rentalRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export default DevolutionRentalUseCase;
