import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { EntityError } from "../../Error";

export class Name {
  private value: string;
  private static schema = Joi.string().min(3).max(100).required();

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Either<EntityError, Name> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new EntityError("User", "name", 400, error.message));
    }

    return new Right(new Name(value));
  }

  get getValue(): string {
    return this.value;
  }
}
