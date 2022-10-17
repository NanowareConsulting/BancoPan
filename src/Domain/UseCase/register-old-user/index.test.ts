//test register old user
import { faker } from "@faker-js/faker";

import { UCRegisterOldUser } from "./UseCase";

describe("UCRegisterOldUser", () => {
  function generateDummyOldUser() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: faker.random.numeric(11),
    };
  }

  it("should register a new old user", async () => {
    const oldUser = generateDummyOldUser();

    const oldUserOrError = await UCRegisterOldUser.execute(oldUser);

    expect(oldUserOrError.isRight()).toBe(true);
  });

  it("should not register a new old user with invalid data", async () => {
    const oldUser = generateDummyOldUser();

    oldUser.cpf = "invalidCpf";

    const oldUserOrError = await UCRegisterOldUser.execute(oldUser);

    expect(oldUserOrError.isLeft()).toBe(true);
  });
});
