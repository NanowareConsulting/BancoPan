import { NextFunction, Request, Response } from "express";

import { UCApplyForOldCreditCard } from "@/Domain";

export class CTRLApplyForOldCreditCard {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userCpf, userEmail } = request.body;

      const oldCreditCardOrError = await UCApplyForOldCreditCard.execute({
        userCpf,
        userEmail,
      });

      if (oldCreditCardOrError.isLeft()) {
        return response.status(400).json(oldCreditCardOrError.value);
      }

      const oldCreditCard = oldCreditCardOrError.value;

      return response.status(201).json(oldCreditCard);
    } catch (err) {
      next(err);
    }
  }
}
