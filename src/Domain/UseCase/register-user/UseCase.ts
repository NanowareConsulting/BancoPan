import { IUserRepo } from "@/Adapter";
import { User } from "@/Domain";

import {
  IUCRegisterUser,
  IUCRegisterUserInput,
  IUCRegisterUserOutput,
} from "./interface";

export class UCRegisterUser implements IUCRegisterUser {
  constructor(private userRepo: IUserRepo) {
    this.execute = this.execute.bind(this);
  }

  async execute(data: IUCRegisterUserInput): Promise<IUCRegisterUserOutput> {
    const userOrError = User.create(data);

    if (userOrError.isLeft()) {
      throw userOrError.value;
    }

    const user = userOrError.value;

    const userCreated = await this.userRepo.create(user);

    return {
      id: userCreated.id,
      name: userCreated.name,
      cpf: userCreated.cpf,
      email: userCreated.email,
    };
  }
}
