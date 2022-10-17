import Joi from "joi";

import { Either, Left, Right } from "@/Utils/Either";

import { Entity } from "../Core";

type OldLoanProps = {
  amount: number;
  interest: number;
  total: number;
  userCpf: string;
  userEmail: string;
};

export class OldLoan extends Entity {
  public amount: number;
  public interest: number;
  public total: number;
  public userCpf: string;
  public userEmail: string;

  private constructor(data: OldLoanProps, id?: string) {
    super(id);

    this.amount = data.amount;
    this.interest = data.interest;
    this.total = data.total;
    this.userCpf = data.userCpf;
    this.userEmail = data.userEmail;
  }

  public static create(
    data: Omit<OldLoanProps, "interest" | "total">
  ): Either<Error, OldLoan> {
    const props = {
      ...data,
      interest: 0.1,
      total: data.amount + data.amount * 0.1,
    };

    const error = OldLoan.validate(props);

    if (error.isLeft()) {
      return new Left(error.value);
    }

    return new Right(new OldLoan(props));
  }

  public static existing(data: OldLoanProps, id: string): OldLoan {
    return new OldLoan(data, id);
  }

  private static validate(data: OldLoanProps): Either<Error, void> {
    const schema = Joi.object({
      amount: Joi.number().required(),
      interest: Joi.number().required(),
      total: Joi.number().required(),
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
