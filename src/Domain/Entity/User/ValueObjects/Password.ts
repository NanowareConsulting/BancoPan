import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { EntityError } from "../../Error";

export class Password {
  private value: string;
  private static schema = Joi.string().min(6).required();

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Either<EntityError, Password> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new EntityError("User", "password", 400, error.message));
    }

    return new Right(new Password(value));
  }

  get getValue(): string {
    return this.value;
  }
}
