import ICreateCategoryDTO from "@modules/cars/dtos/ICreateCategoryDTO";
import Category from "@modules/cars/entities/Category";
import ICategoriesRepository from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private catecories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.catecories.find((category) => category.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    const all = this.catecories;

    return all;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.catecories.push(category);
  }
}

export default CategoriesRepositoryInMemory;
