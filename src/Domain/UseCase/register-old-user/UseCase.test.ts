import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

import { MockOldUserRepo } from "@/Adapter";
import { UCRegisterOldUser } from "@/Domain";

const oldUserRepo = new MockOldUserRepo();
const service = new UCRegisterOldUser(oldUserRepo);

describe("Register user", () => {
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

  it("should create a new user", async () => {
    const data = generateDummyData();

    const user = await service.execute(data);

    expect(user).toBeTruthy();
  });
});
