import Joi from "joi";

import { EntityError, ValueObject } from "@/Domain/Entity/Core";
import { Either, Left, Right } from "@/Utils/Either";

type NameProps = {
  value: string;
};
export class Name extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props);
  }

  public static create(value: string): Either<EntityError, Name> {
    const { error } = this.schema.validate(value);

    if (error) {
      return new Left(new EntityError(`Invalid name : ${error.message}`));
    }

    return new Right(new Name({ value }));
  }

  private static schema = Joi.string().min(3).max(30).required();
}
