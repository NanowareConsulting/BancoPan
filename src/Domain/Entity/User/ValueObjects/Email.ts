import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { EntityError } from "../../Error";

export class Email {
  private value: string;
  private static schema = Joi.string().email().required();

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Either<EntityError, Email> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new EntityError("User", "email", 400, error.message));
    }

    return new Right(new Email(value));
  }

  get getValue(): string {
    return this.value;
  }
}
