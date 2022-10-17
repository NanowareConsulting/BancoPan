//test register old user
import { faker } from "@faker-js/faker";

import { UCApplyForOldLoan, UCGetOldLoan, UCRegisterOldUser } from "@/Domain";

describe("Get Old loan", () => {
  function generateDummyOldUser() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: faker.random.numeric(11),
    };
  }

  it("should get old loan", async () => {
    const oldUser = generateDummyOldUser();

    const oldUserOrError = await UCRegisterOldUser.execute(oldUser);

    expect(oldUserOrError.isRight()).toBeTruthy();

    const creditCardOrError = await UCApplyForOldLoan.execute({
      amount: 1000,
      userCpf: oldUser.cpf,
      userEmail: oldUser.email,
    });

    expect(creditCardOrError.isRight()).toBeTruthy();

    const creditCardsOrError = await UCGetOldLoan.execute({
      cpf: oldUser.cpf,
    });

    expect(creditCardsOrError.isRight()).toBeTruthy();
    expect(creditCardsOrError.value).toHaveLength(1);
  });
});
