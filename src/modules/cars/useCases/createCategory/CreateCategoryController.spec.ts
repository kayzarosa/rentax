import request from "supertest";

import app from "@shared/infra/http/app";

import AppDataSource from "@database/ormconfig";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async () => {
        console.log("Initializing the database...");
        await AppDataSource.runMigrations();
      })
      .catch((err) => console.log(err));
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
  });

  afterAll(async () => {
    await AppDataSource.destroy()
      .then(() => {
        console.log("Banco finalizado");
      })
      .catch((err) => console.log(err));
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
