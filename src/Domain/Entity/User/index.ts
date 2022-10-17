import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { Entity, EntityError } from "../Core";
import { CreditCard } from "../CreditCard";
import { Loan } from "../Loan";

type UserProps = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  creditCards: Omit<CreditCard, "owner">[];
  loans: Omit<Loan, "owner">[];
};

export class User extends Entity {
  public name: string;
  public email: string;
  public cpf: string;
  public password: string;

  private constructor(props: UserProps, id?: string) {
    super(id);
    this.name = props.name;
    this.email = props.email;
    this.cpf = props.cpf;
    this.password = props.password;
  }

  public static create(props: UserProps): Either<EntityError, User> {
    try {
      this.validate(props);
      return new Right(new User(props));
    } catch (error: any) {
      return new Left(new EntityError(error.message));
    }
  }

  public static existing(props: UserProps, id: string): User {
    return new User(props, id);
  }

  private static validate(props: UserProps): void {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().length(11).required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(props);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }
}
