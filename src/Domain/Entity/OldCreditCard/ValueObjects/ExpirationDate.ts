import Joi from "joi";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type ExpirationDateProps = {
  value: Date;
};
export class ExpirationDate extends ValueObject<ExpirationDateProps> {
  private constructor(props: ExpirationDateProps) {
    super(props);
  }

  public static create(value: Date): Either<Error, ExpirationDate> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new Error(`Invalid expiration date : ${error.message}`));
    }

    return new Right(new ExpirationDate({ value }));
  }

  private static schema = Joi.date().required();
}
