import request from "supertest";

import app from "@shared/infra/http/app";

import AppDataSource from "@database/ormconfig";

describe("List Category Controller", () => {
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

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const listCategories = await request(app).get("/categories");

    expect(listCategories.status).toBe(200);
    expect(listCategories.body.length).toBe(1);
    expect(listCategories.body[0]).toHaveProperty("id");
    expect(listCategories.body[0].name).toEqual("Category SuperTest");
  });
});
