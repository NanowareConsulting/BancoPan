import Joi from "joi";

import { ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type EmailProps = {
  value: string;
};
export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(value: string): Either<Error, Email> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new Error(`Invalid email : ${error.message}`));
    }

    return new Right(new Email({ value }));
  }

  private static schema = Joi.string().email().required();
}
