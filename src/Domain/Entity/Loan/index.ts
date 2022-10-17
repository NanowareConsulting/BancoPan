import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { Entity, EntityError } from "../Core";
import { User } from "../User";

type LoanProps = {
  amount: number;
  interest: number;
  total: number;
  owner: User;
};

export class Loan extends Entity {
  public amount: number;
  public interest: number;
  public total: number;
  public owner: User;

  private constructor(props: LoanProps, id?: string) {
    super(id);
    this.amount = props.amount;
    this.interest = props.interest;
    this.total = props.total;
    this.owner = props.owner;
  }

  public static create(
    props: Omit<LoanProps, "interest" | "total">
  ): Either<EntityError, Loan> {
    try {
      const data = {
        ...props,
        interest: 0.1,
        total: props.amount * 1.1,
      };

      this.validate(data);
      return new Right(new Loan(data));
    } catch (error: any) {
      return new Left(new EntityError(error.message));
    }
  }

  public static existing(props: LoanProps, id: string): Loan {
    return new Loan(props, id);
  }

  private static validate(props: LoanProps): void {
    const schema = Joi.object({
      amount: Joi.number().required(),
      interest: Joi.number().required(),
      total: Joi.number().required(),
      owner: Joi.object().required(),
    });

    const { error } = schema.validate(props);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }
}
