import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { Entity } from "../Core";

type OldCreditCardProps = {
  number: string;
  securityCode: string;
  expirationDate: Date;
  userCpf: string;
  userEmail: string;
};

export class OldCreditCard extends Entity {
  public number: string;
  public securityCode: string;
  public expirationDate: Date;
  public userCpf: string;
  public userEmail: string;

  private constructor(data: OldCreditCardProps, id?: string) {
    super(id);
    this.number = data.number;
    this.securityCode = data.securityCode;
    this.expirationDate = data.expirationDate;
    this.userCpf = data.userCpf;
    this.userEmail = data.userEmail;
  }

  public static create(
    data: Omit<OldCreditCardProps, "number" | "securityCode" | "expirationDate">
  ): Either<Error, OldCreditCard> {
    const props = {
      ...data,
      // 16 digits
      number: Math.floor(Math.random() * 1000000000000000 * 10).toString(),
      securityCode: Math.floor(Math.random() * 1000).toString(),
      expirationDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 4)
      ),
    };

    const error = OldCreditCard.validate(props);

    if (error.isLeft()) {
      return new Left(error.value);
    }

    return new Right(new OldCreditCard(props));
  }

  public static existing(data: OldCreditCardProps, id: string): OldCreditCard {
    return new OldCreditCard(data, id);
  }

  private static validate(data: OldCreditCardProps): Either<Error, void> {
    const schema = Joi.object({
      number: Joi.string().length(16).required(),
      securityCode: Joi.string().length(3).required(),
      expirationDate: Joi.date().required(),
      userCpf: Joi.string().length(11).required(),
      userEmail: Joi.string().email().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return new Left(new Error(error.message));
    }

    return new Right(undefined);
  }
}
