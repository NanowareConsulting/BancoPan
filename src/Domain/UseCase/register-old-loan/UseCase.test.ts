import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

import { MockOldLoanRepo, MockOldUserRepo } from "@/Adapter";
import { UCRegisterOldLoan, UCRegisterOldUser } from "@/Domain";

const oldUserRepo = new MockOldUserRepo();
const oldLoanRepo = new MockOldLoanRepo(oldUserRepo);
const registerUser = new UCRegisterOldUser(oldUserRepo);
const registerLoan = new UCRegisterOldLoan(oldLoanRepo, oldUserRepo);

describe("Register old loan", () => {
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

  it("should create a loan", async () => {
    const data = generateDummyData();

    const token = await registerUser.execute(data);

    expect(token.isRight()).toBeTruthy();

    const loanOrError = await registerLoan.execute({
      email: data.email,
      cpf: data.cpf,
      amount: 1000,
    });

    expect(loanOrError.isRight()).toBeTruthy();
  });
});
