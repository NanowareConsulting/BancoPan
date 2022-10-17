import { NextFunction, Request, Response } from "express";

import { UCGetOldLoan } from "@/Domain";

export class CTRLGetOldLoans {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { cpf } = request.params;

      const oldLoansOrError = await UCGetOldLoan.execute({
        cpf,
      });

      if (oldLoansOrError.isLeft()) {
        return response.status(400).json(oldLoansOrError.value);
      }

      const oldLoans = oldLoansOrError.value;

      return response.status(200).json(oldLoans);
    } catch (err) {
      next(err);
    }
  }
}
