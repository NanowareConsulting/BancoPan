import { Either, Left, Right } from "@/Utils/Either";

import { Entity } from "../Core";
import { EntityError } from "../Error";
import { Email, Name, Password } from "./ValueObjects";

type UserProps = {
  name: string;
  email: string;
  password: string;
};

type UserEntity = {
  name: Name;
  email: Email;
  password: Password;
};

export class User extends Entity {
  private name: Name;
  private email: Email;
  private password: Password;

  private constructor({ name, email, password }: UserEntity, id?: string) {
    super(id);
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public static create(
    data: UserProps,
    id?: string
  ): Either<EntityError, User> {
    const nameOrError = Name.create(data.name);
    const emailOrError = Email.create(data.email);
    const passwordOrError = Password.create(data.password);

    if (nameOrError.isLeft()) {
      return new Left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return new Left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return new Left(passwordOrError.value);
    }

    const user = new User(
      {
        name: nameOrError.value,
        email: emailOrError.value,
        password: passwordOrError.value,
      },
      id
    );

    return new Right(user);
  }

  get getName(): string {
    return this.name.getValue;
  }

  get getEmail(): string {
    return this.email.getValue;
  }

  get getPassword(): string {
    return this.password.getValue;
  }
}
