import "reflect-metadata";
import { DataSource } from "typeorm";
//docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database
//yarn typeorm migration:create src/database/migrations/CreateCategories
//yarn typeorm migration:revert -d src/database/ormconfig.ts

const AppDataSource = new DataSource({
  type: "postgres",
  host: "nome do container do docker-compose.yml",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: true,
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => console.log(err));

export default AppDataSource;
