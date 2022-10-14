import Joi from "joi";

import { EntityError, ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type PasswordProps = {
  value: string;
};
export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  public static create(value: string): Either<EntityError, Password> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new EntityError(`Invalid password : ${error.message}`));
    }

    return new Right(new Password({ value }));
  }

  private static schema = Joi.string().min(8).max(30).required();
}
