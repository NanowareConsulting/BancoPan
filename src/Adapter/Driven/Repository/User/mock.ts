import { User } from "@/Domain";
import { Either, Left, Right } from "@/Utils/Either";

import { IUserRepo } from "./interface";

export class MockUserRepo implements IUserRepo {
  private users: User[] = [];

  public async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  public async update(user: User): Promise<Either<Error, User>> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      return new Left(new Error("User not found"));
    }

    this.users[index] = user;
    return new Right(user);
  }

  public async delete(user: User): Promise<Either<Error, User>> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      return new Left(new Error("User not found"));
    }

    this.users.splice(index, 1);
    return new Right(user);
  }

  public async find(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findByCpf(cpf: string): Promise<User> {
    const user = this.users.find((u) => u.cpf === cpf);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
