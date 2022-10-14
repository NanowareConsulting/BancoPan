import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { EntityError, ValueObject } from "../../Core";

type SecurityCodeProps = {
  value: number;
};

export class SecurityCode extends ValueObject<SecurityCodeProps> {
  private constructor(props: SecurityCodeProps) {
    super(props);
  }

  public static create(value: number): Either<EntityError, SecurityCode> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(
        new EntityError(`Invalid Security Code : ${error.message}`)
      );
    }

    return new Right(new SecurityCode({ value }));
  }

  private static schema = Joi.number().min(100).max(999).required();
}
