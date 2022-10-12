import { MockUserRepository } from "@/Adapter/Driven/Repository/User/mock";

import { UCRegisterUser } from "./index";

describe("Register User Use Case", () => {
  const userRepo = new MockUserRepository();
  const service = new UCRegisterUser(userRepo);

  const dummyUser = {
    name: "Test User",
    email: "test@user.com",
    password: "Senha@123",
  };

  it("should register a user", async () => {
    const result = await service.execute(dummyUser);
    expect(result.isRight()).toBeTruthy();
  });

  it("should not register a user with invalid email", async () => {
    const result = await service.execute({
      ...dummyUser,
      email: "invalidEmail",
    });
    expect(result.isLeft()).toBeTruthy();
  });

  it("should not register a user with invalid password", async () => {
    const result = await service.execute({
      ...dummyUser,
      password: "invalidPassword",
    });
    expect(result.isLeft()).toBeTruthy();
  });

  it("should not register a user with invalid name", async () => {
    const result = await service.execute({
      ...dummyUser,
      name: "",
    });
    expect(result.isLeft()).toBeTruthy();
  });
});
