import AppDataSource from "./ormconfig";

AppDataSource.initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => console.log(err));

export default AppDataSource;
