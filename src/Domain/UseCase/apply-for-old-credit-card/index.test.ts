//test apply for old credit card
import { faker } from "@faker-js/faker";

import { UCApplyForOldCreditCard, UCRegisterOldUser } from "@/Domain";

describe("Apply for old credit card", () => {
  function generateDummyOldUser() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: faker.random.numeric(11),
    };
  }

  it("should apply for old credit card", async () => {
    const user = generateDummyOldUser();
    const userOrError = await UCRegisterOldUser.execute(user);
    expect(userOrError.isRight()).toBeTruthy();

    const oldCreditCardOrError = await UCApplyForOldCreditCard.execute({
      userCpf: user.cpf,
      userEmail: user.email,
    });

    expect(oldCreditCardOrError.isRight()).toBeTruthy();
  });

  it("should not apply for old credit card if user does not exist", async () => {
    const oldCreditCardOrError = await UCApplyForOldCreditCard.execute({
      userCpf: faker.random.numeric(11),
      userEmail: faker.internet.email(),
    });

    expect(oldCreditCardOrError.isLeft()).toBeTruthy();
  });
});
