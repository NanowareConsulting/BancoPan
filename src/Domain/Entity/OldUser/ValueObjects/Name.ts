import Joi from "joi";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type NameProps = {
  value: string;
};
export class Name extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props);
  }

  public static create(value: string): Either<Error, Name> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new Error(`Invalid name : ${error.message}`));
    }

    return new Right(new Name({ value }));
  }

  private static schema = Joi.string().min(3).max(30).required();
}
