import { User } from "@/Domain";
import { Either } from "@/Utils/Either";

import { RepositoryError } from "../Error";

export interface IUserRepository {
  userExists(id: string): Promise<boolean>;
  emailAlreadyExists(email: string): Promise<boolean>;
  save(
    user: User
  ): Promise<Either<RepositoryError, Either<RepositoryError, void>>>;
  update(user: User): Promise<Either<RepositoryError, void>>;
  delete(id: string): Promise<Either<RepositoryError, void>>;
  find(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
}
