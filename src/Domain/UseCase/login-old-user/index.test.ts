//test register old user
import { faker } from "@faker-js/faker";

import { UCLogInOldUser, UCRegisterOldUser } from "@/Domain";

describe("UCLogInOldUser", () => {
  function generateDummyOldUser() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: faker.random.numeric(11),
    };
  }

  it("should log in an old user", async () => {
    const dummyData = generateDummyOldUser();

    const oldUserOrError = await UCRegisterOldUser.execute(dummyData);

    expect(oldUserOrError.isRight()).toBeTruthy();

    const oldUser = oldUserOrError.value;

    const loggedInUserOrError = await UCLogInOldUser.execute({
      cpf: dummyData.cpf,
      password: dummyData.password,
    });

    expect(loggedInUserOrError.isRight()).toBeTruthy();
  });
});
