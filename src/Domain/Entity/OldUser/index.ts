import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { Entity } from "../Core";

type OldUserProps = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};

export class OldUser extends Entity {
  public name: string;
  public cpf: string;
  public email: string;
  public password: string;

  private constructor(data: OldUserProps, id?: string) {
    super(id);
    this.name = data.name;
    this.cpf = data.cpf;
    this.email = data.email;
    this.password = data.password;
  }

  public static create(data: OldUserProps): Either<Error, OldUser> {
    const error = OldUser.validate(data);

    if (error.isLeft()) {
      return new Left(error.value);
    }

    return new Right(new OldUser(data));
  }

  public static existing(data: OldUserProps, id: string): OldUser {
    return new OldUser(data, id);
  }

  private static validate(data: OldUserProps): Either<Error, void> {
    const schema = Joi.object({
      name: Joi.string().required(),
      cpf: Joi.string().length(11).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return new Left(new Error(error.message));
    }

    return new Right(undefined);
  }
}
