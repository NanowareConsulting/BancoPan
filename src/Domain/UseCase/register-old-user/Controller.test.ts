import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";
import { Server } from "http";
import request from "supertest";

import { app } from "@/Application/Server";

describe("Register User Controller", () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll(() => {
    server.close();
  });

  function generateDummyData(): {
    name: string;
    email: string;
    cpf: string;
    password: string;
  } {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      cpf: cpf.generate(true),
      password: faker.internet.password(),
    };
  }

  it("should return 201 when user is created", async () => {
    const data = generateDummyData();

    const response = await request(server).post("/old/users").send(data);

    expect(response.status).toBe(201);
  });
});
