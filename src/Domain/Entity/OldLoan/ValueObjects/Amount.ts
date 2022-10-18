import Joi from "joi";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type AmountProps = {
  value: number;
};
export class Amount extends ValueObject<AmountProps> {
  private constructor(props: AmountProps) {
    super(props);
  }

  public static create(value: number): Either<Error, Amount> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new Error(`Invalid Amount : ${error.message}`));
    }

    return new Right(new Amount({ value }));
  }

  private static schema = Joi.number().min(0).required();
}
