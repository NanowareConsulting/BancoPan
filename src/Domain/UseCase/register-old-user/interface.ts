import { OldUser } from "@/Domain";
import { Either } from "@/Utils/Either";

import { UseCase } from "../Core";
import { RegisterOldUserError } from "./Error";

export interface IUCRegisterOldUser
  extends UseCase<RegisterOldUserRequest, RegisterOldUserResponse> {
  execute(data: RegisterOldUserRequest): Promise<RegisterOldUserResponse>;
}

export type RegisterOldUserRequest = {
  name: string;
  email: string;
  cpf: string;
  password: string;
};

export type RegisterOldUserResponse = Either<
  | RegisterOldUserError.EmailAlreadyExists
  | RegisterOldUserError.InvalidCPF
  | RegisterOldUserError.InvalidName
  | RegisterOldUserError.InvalidEmail
  | RegisterOldUserError.InvalidPassword
  | RegisterOldUserError.InvalidCPF,
  OldUser
>;
