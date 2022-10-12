import { User } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

import { RepositoryError } from "../Error";
import { IUserRepository } from "./interface";

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async userExists(id: string): Promise<boolean> {
    return this.users.some((user) => user.getId === id);
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    return this.users.some((user) => user.getEmail === email);
  }

  async save(
    user: User
  ): Promise<Either<RepositoryError, Either<RepositoryError, void>>> {
    const userAlreadyExists = await this.userExists(user.getId);

    if (userAlreadyExists) {
      return new Left(
        new RepositoryError("User", "save", 400, "User already exists")
      );
    }

    const emailAlreadyExists = await this.emailAlreadyExists(user.getEmail);

    if (emailAlreadyExists) {
      return new Left(
        new RepositoryError("User", "save", 400, "Email already exists")
      );
    }

    this.users.push(user);

    return new Right(new Right(undefined));
  }

  async update(user: User): Promise<Either<RepositoryError, void>> {
    const foundUser = this.find(user.getId);

    if (!foundUser) {
      return new Left(
        new RepositoryError("User", "update", 400, "User not found")
      );
    }

    const emailAlreadyExists = await this.emailAlreadyExists(user.getEmail);

    if (emailAlreadyExists) {
      return new Left(
        new RepositoryError("User", "update", 400, "Email already exists")
      );
    }

    const index = this.users.findIndex((user) => user.getId === user.getId);

    this.users[index] = user;

    return new Right(undefined);
  }

  async delete(id: string): Promise<Either<RepositoryError, void>> {
    const foundUser = this.find(id);

    if (!foundUser) {
      return new Left(
        new RepositoryError("User", "delete", 400, "User not found")
      );
    }

    this.users = this.users.filter((user) => user.getId !== id);

    return new Right(undefined);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.getEmail === email);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async find(id: string): Promise<User> {
    const user = this.users.find((user) => user.getId === id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
