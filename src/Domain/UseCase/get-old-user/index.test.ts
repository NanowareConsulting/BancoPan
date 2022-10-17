//test register old user
import { faker } from "@faker-js/faker";

import { UCGetOldUser, UCRegisterOldUser } from "@/Domain";

describe("UCGetOldUser", () => {
  function generateDummyOldUser() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: faker.random.numeric(11),
    };
  }

  it("should get old user", async () => {
    const oldUser = generateDummyOldUser();

    const oldUserOrError = await UCRegisterOldUser.execute(oldUser);

    expect(oldUserOrError.isRight()).toBeTruthy();

    const userOrError = await UCGetOldUser.execute({
      cpf: oldUser.cpf,
    });

    expect(userOrError.isRight()).toBeTruthy();
  });

  it("should not get old user if user does not exist", async () => {
    const oldUserOrError = await UCGetOldUser.execute({
      cpf: faker.random.numeric(11),
    });

    expect(oldUserOrError.isLeft()).toBe(true);
  });
});
