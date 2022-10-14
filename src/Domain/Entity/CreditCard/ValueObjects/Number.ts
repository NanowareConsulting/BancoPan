import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { EntityError, ValueObject } from "../../Core";

type NumberProps = {
  value: number;
};

export class Number extends ValueObject<NumberProps> {
  private constructor(props: NumberProps) {
    super(props);
  }

  public static create(value: number): Either<EntityError, Number> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(
        new EntityError(`Invalid Credit Card Number : ${error.message}`)
      );
    }

    return new Right(new Number({ value }));
  }

  private static schema = Joi.number()
    .min(1000000000000000)
    .max(8999999999999999)
    .required();
}
