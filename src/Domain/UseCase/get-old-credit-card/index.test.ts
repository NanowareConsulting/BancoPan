//test register old user
import { faker } from "@faker-js/faker";

import {
  UCApplyForOldCreditCard,
  UCGetOldCreditCard,
  UCRegisterOldUser,
} from "@/Domain";

describe("Get Old Credit Cards", () => {
  function generateDummyOldUser() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: faker.random.numeric(11),
    };
  }

  it("should get old credit cards", async () => {
    const oldUser = generateDummyOldUser();

    const oldUserOrError = await UCRegisterOldUser.execute(oldUser);

    expect(oldUserOrError.isRight()).toBeTruthy();

    const creditCardOrError = await UCApplyForOldCreditCard.execute({
      userCpf: oldUser.cpf,
      userEmail: faker.internet.email(),
    });

    expect(creditCardOrError.isRight()).toBeTruthy();

    const creditCardsOrError = await UCGetOldCreditCard.execute({
      cpf: oldUser.cpf,
    });

    expect(creditCardsOrError.isRight()).toBeTruthy();
    expect(creditCardsOrError.value).toHaveLength(1);
  });
});
