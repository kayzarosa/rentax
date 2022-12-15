import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Available Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "AD2-D545",
      fine_amount: 100,
      brand: "Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availble cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "AD2-D545",
      fine_amount: 100,
      brand: "Brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availble cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "AD2-D545",
      fine_amount: 100,
      brand: "Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availble cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car5",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "AD2-D545",
      fine_amount: 100,
      brand: "Brand",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
