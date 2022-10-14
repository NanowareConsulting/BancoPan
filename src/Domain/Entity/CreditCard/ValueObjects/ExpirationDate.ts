import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { EntityError, ValueObject } from "../../Core";

type ExpirationDateProps = {
  value: Date;
};

export class ExpirationDate extends ValueObject<ExpirationDateProps> {
  private constructor(props: ExpirationDateProps) {
    super(props);
  }

  public static create(value: Date): Either<EntityError, ExpirationDate> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(
        new EntityError(`Invalid Expiration Date : ${error.message}`)
      );
    }

    return new Right(new ExpirationDate({ value }));
  }

  private static schema = Joi.date().required();
}
