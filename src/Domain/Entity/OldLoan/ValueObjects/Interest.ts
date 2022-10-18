import Joi from "joi";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type InterestProps = {
  value: number;
};
export class Interest extends ValueObject<InterestProps> {
  private constructor(props: InterestProps) {
    super(props);
  }

  public static create(value: number): Either<Error, Interest> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new Error(`Invalid interest rate : ${error.message}`));
    }

    return new Right(new Interest({ value }));
  }

  private static schema = Joi.number().min(0).required();
}
