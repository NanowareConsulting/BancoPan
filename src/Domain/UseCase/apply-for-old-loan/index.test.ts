//test apply for old Loan
import { faker } from "@faker-js/faker";

import { UCApplyForOldLoan, UCRegisterOldUser } from "@/Domain";

describe("Apply for Old Loan", () => {
  function generateDummyOldUser() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: faker.random.numeric(11),
    };
  }

  it("should apply for old loan", async () => {
    const user = generateDummyOldUser();
    const userOrError = await UCRegisterOldUser.execute(user);
    expect(userOrError.isRight()).toBeTruthy();

    const oldLoanOrError = await UCApplyForOldLoan.execute({
      amount: 1000,
      userCpf: user.cpf,
      userEmail: user.email,
    });

    expect(oldLoanOrError.isRight()).toBeTruthy();
  });
});
