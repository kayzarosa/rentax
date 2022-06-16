import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  entities: ["src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"]
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => console.log(err));

export default AppDataSource;
