import Joi from "joi";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

import { PasswordHash } from "./PasswordHash";

type PasswordProps = {
  value: string;
};
export class Password extends ValueObject<PasswordProps> {
  public static create(value: string): Either<Error, PasswordHash> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new Error(`Invalid password : ${error.message}`));
    }

    return new Right(PasswordHash.create(value));
  }

  public static existing(value: string): PasswordHash {
    return PasswordHash.create(value);
  }

  private static schema = Joi.string().min(8).max(30).required();
}
