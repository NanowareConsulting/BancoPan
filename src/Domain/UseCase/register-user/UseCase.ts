import { UserRepo } from "@/Adapter";
import { Email, Name, Password, User } from "@/Domain";
import { Left, Right } from "@/Utils/Either";

import { RegisterUserError } from "./Error";
import {
  IUCRegisterUser,
  RegisterUserRequest,
  RegisterUserResponse,
} from "./interface";

export class UCRegisterUser implements IUCRegisterUser {
  constructor(private readonly userRepository: UserRepo) {}

  async execute(data: RegisterUserRequest): Promise<RegisterUserResponse> {
    const name = Name.create(data.name);
    const email = Email.create(data.email);
    const password = Password.create(data.password);

    if (name.isLeft()) {
      return new Left(new RegisterUserError.InvalidName(data.name));
    }

    if (email.isLeft()) {
      return new Left(new RegisterUserError.InvalidEmail(data.email));
    }

    if (password.isLeft()) {
      return new Left(new RegisterUserError.InvalidPassword(data.password));
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists) {
      return new Left(new RegisterUserError.EmailAlreadyExists(data.email));
    }

    const user = User.create({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    const userCreated = await this.userRepository.save(user);

    return new Right(userCreated);
  }
}
