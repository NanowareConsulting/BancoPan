import { IUserRepository } from "@/Adapter";
import { User } from "@/Domain";
import { Left, Right } from "@/Utils/Either";

import {
  IRegisterUser,
  RegisterUserRequest,
  RegisterUserResponse,
} from "./interface";

export class UCRegisterUser implements IRegisterUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: RegisterUserRequest): Promise<RegisterUserResponse> {
    const userOrError = User.create(data);

    if (userOrError.isLeft()) {
      return new Left(userOrError.value);
    }

    const user = userOrError.value;

    const createdUserOrError = await this.userRepository.save(user);

    if (createdUserOrError.isLeft()) {
      return new Left(createdUserOrError.value);
    }

    return new Right(undefined);
  }
}
