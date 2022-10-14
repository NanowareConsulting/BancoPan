import { IUserRepository } from "@/Adapter";
import { Email, Name, Password, User } from "@/Domain";
import { Left, Right } from "@/Utils/Either";

import {
  IRegisterUser,
  RegisterUserRequest,
  RegisterUserResponse,
} from "./interface";

export class UCRegisterUser implements IRegisterUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: RegisterUserRequest): Promise<RegisterUserResponse> {
    const name = Name.create(data.name);
    const email = Email.create(data.email);
    const password = Password.create(data.password);

    if (name.isLeft()) {
      return new Left(name.value);
    }

    if (email.isLeft()) {
      return new Left(email.value);
    }

    if (password.isLeft()) {
      return new Left(password.value);
    }

    const user = User.create({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    const userCreated = await this.userRepository.save(user);

    if (userCreated.isLeft()) {
      return new Left(userCreated.value);
    }

    return new Right(user.toJSON());
  }
}
