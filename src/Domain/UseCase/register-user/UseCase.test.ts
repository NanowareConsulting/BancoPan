import { faker } from "@faker-js/faker";

import { MockUserRepo } from "@/Adapter";
import { UCRegisterUser } from "@/Domain";

const userRepo = new MockUserRepo();
const service = new UCRegisterUser(userRepo);

describe("Register user", () => {
  function generateDummyData(): {
    name: string;
    email: string;
    password: string;
  } {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  it("should create a new user", async () => {
    const data = generateDummyData();

    const user = await service.execute(data);

    expect(user).toBeTruthy();
  });
});
