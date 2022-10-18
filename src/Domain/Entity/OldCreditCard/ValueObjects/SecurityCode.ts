import Joi from "joi";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type SecurityCodeProps = {
  value: number;
};
export class SecurityCode extends ValueObject<SecurityCodeProps> {
  private constructor(props: SecurityCodeProps) {
    super(props);
  }

  public static create(value: number): Either<Error, SecurityCode> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new Error(`Invalid security code : ${error.message}`));
    }

    return new Right(new SecurityCode({ value }));
  }

  private static schema = Joi.number().min(100).max(999).required();
}
