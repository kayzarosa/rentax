//docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database
//yarn typeorm migration:create src/database/migrations/CreateCategories
//yarn typeorm migration:revert -d src/database/ormconfig.ts

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
