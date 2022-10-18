import { User } from "@/Domain";
import { Either } from "@/Utils/Either";

import { UseCase } from "../Core";
import { RegisterUserError } from "./Error";

export interface IUCRegisterUser
  extends UseCase<RegisterUserRequest, RegisterUserResponse> {
  execute(data: RegisterUserRequest): Promise<RegisterUserResponse>;
}

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = Either<
  | RegisterUserError.EmailAlreadyExists
  | RegisterUserError.InvalidName
  | RegisterUserError.InvalidEmail
  | RegisterUserError.InvalidPassword,
  User
>;
