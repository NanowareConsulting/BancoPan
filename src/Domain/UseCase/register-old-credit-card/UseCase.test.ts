import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

import { MockOldCreditCardRepo, MockOldUserRepo } from "@/Adapter";
import { UCRegisterOldCreditCard, UCRegisterOldUser } from "@/Domain";

const oldUserRepo = new MockOldUserRepo();
const oldCreditCardRepo = new MockOldCreditCardRepo(oldUserRepo);
const registerUser = new UCRegisterOldUser(oldUserRepo);
const registerCreditCard = new UCRegisterOldCreditCard(
  oldCreditCardRepo,
  oldUserRepo
);

describe("Register old credit card", () => {
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

  it("should create a credit card", async () => {
    const data = generateDummyData();

    const token = await registerUser.execute(data);

    expect(token.isRight()).toBeTruthy();

    const creditCardOrError = await registerCreditCard.execute({
      email: data.email,
      cpf: data.cpf,
    });

    expect(creditCardOrError.isRight()).toBeTruthy();
  });
});
