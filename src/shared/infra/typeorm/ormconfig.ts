import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const infoConnection: DataSourceOptions = {
  type: "postgres",
  host: process.env.NODE_ENV !== "test" ? "database_ignite" : "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
  entities: ["src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
};

const AppDataSource = new DataSource(infoConnection);

export default AppDataSource;
