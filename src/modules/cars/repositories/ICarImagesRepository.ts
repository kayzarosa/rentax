import ICreateCarImagesDTO from "../dtos/ICreateCarImagesDTO";
import CarImage from "../infra/typeorm/entities/CarImage";

export default interface ICarImagesRepository {
  create(dataCarImage: ICreateCarImagesDTO): Promise<CarImage>;
}