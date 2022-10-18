import { NextFunction, Request, Response } from "express";

import { UCApplyForOldLoan } from "@/Domain";

export class CTRLApplyForOldLoan {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { cpf } = request.user;
      const { email, amount } = request.body;

      const oldLoanOrError = await UCApplyForOldLoan.execute({
        amount: amount,
        userCpf: cpf,
        userEmail: email,
      });

      if (oldLoanOrError.isLeft()) {
        return response.status(400).json(oldLoanOrError.value.message);
      }

      const oldLoan = oldLoanOrError.value;

      return response.status(201).json(oldLoan);
    } catch (err) {
      next(err);
    }
  }
}
