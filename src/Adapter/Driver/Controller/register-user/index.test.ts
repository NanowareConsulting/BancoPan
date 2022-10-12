import { Server } from "http";
import request from "supertest";

import { app } from "@/Application/Server";

describe("Register User Controller", () => {
  let server: Server;

  const dummyUser = {
    name: "test user",
    email: "test@user.com",
    password: "test@123",
  };

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll(() => {
    server.close();
  });

  it("should return 201 when user is created", async () => {
    const response = await request(server).post("/register").send(dummyUser);

    expect(response.status).toBe(201);
  });

  it("should return 400 when user is not created due to invalid name", async () => {
    const response = await request(server)
      .post("/register")
      .send({
        ...dummyUser,
        name: "test",
      });

    expect(response.status).toBe(400);
  });

  it("should return 400 when user is not created due to invalid email", async () => {
    const response = await request(server)
      .post("/register")
      .send({
        ...dummyUser,
        email: "test",
      });

    expect(response.status).toBe(400);
  });

  it("should return 400 when user is not created due to invalid password", async () => {
    const response = await request(server)
      .post("/register")
      .send({
        ...dummyUser,
        password: "test",
      });

    expect(response.status).toBe(400);
  });
});
