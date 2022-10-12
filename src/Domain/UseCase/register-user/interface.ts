import { RepositoryError } from "@/Adapter";
import { EntityError } from "@/Domain/Entity";
import { Either } from "@/Utils/Either";

export interface IRegisterUser {
  execute(data: RegisterUserRequest): Promise<RegisterUserResponse>;
}

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = Promise<
  Either<EntityError | RepositoryError, void>
>;
