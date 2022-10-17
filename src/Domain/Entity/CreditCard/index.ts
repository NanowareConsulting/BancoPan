import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { Entity, EntityError } from "../Core";
import { User } from "../User";

type CreditCardProps = {
  number: string;
  securityCode: string;
  expirationDate: Date;
  owner: User;
};

export class CreditCard extends Entity {
  public number: string;
  public securityCode: string;
  public expirationDate: Date;
  public owner: User;

  private constructor(props: CreditCardProps, id?: string) {
    super(id);
    this.number = props.number;
    this.securityCode = props.securityCode;
    this.expirationDate = props.expirationDate;
    this.owner = props.owner;
  }

  public static create(
    props: Omit<CreditCardProps, "number" | "securityCode" | "expirationDate">
  ): Either<EntityError, CreditCard> {
    try {
      const data = {
        ...props,
        number: Math.random().toString().slice(2, 18),
        securityCode: Math.random().toString().slice(2, 5),
        expirationDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 4)
        ),
      };

      this.validate(data);
      return new Right(new CreditCard(data));
    } catch (error: any) {
      return new Left(new EntityError(error.message));
    }
  }

  public static existing(props: CreditCardProps, id: string): CreditCard {
    return new CreditCard(props, id);
  }

  private static validate(props: CreditCardProps): void {
    const schema = Joi.object({
      number: Joi.string().length(16).required(),
      securityCode: Joi.string().length(3).required(),
      expirationDate: Joi.date().required(),
      owner: Joi.object().required(),
    });

    const { error } = schema.validate(props);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }
}
