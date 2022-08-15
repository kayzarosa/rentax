import AppError from "@shared/errors/AppError";

import CreateCategoryUseCase from "./CreateCategoryUseCase";
import CategoriesRepositoryInMemory from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

let categoryRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoryRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute(category);

    await expect(
      createCategoryUseCase.execute(category)
    ).rejects.toBeInstanceOf(AppError);
  });
});
