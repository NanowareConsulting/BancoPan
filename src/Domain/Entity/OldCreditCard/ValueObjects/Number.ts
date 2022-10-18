import Joi from "joi";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type NumberProps = {
  value: string;
};
export class Number extends ValueObject<NumberProps> {
  private constructor(props: NumberProps) {
    super(props);
  }

  public static create(value: string): Either<Error, Number> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new Error(`Invalid number : ${error.message}`));
    }

    return new Right(new Number({ value }));
  }

  private static schema = Joi.string().length(16).required();
}
