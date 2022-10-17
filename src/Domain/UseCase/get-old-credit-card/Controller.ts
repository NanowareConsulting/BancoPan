import { NextFunction, Request, Response } from "express";

import { UCGetOldCreditCard } from "@/Domain";

export class CTRLGetOldCreditCards {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { cpf } = request.params;

      const oldCreditCardsOrError = await UCGetOldCreditCard.execute({
        cpf,
      });

      if (oldCreditCardsOrError.isLeft()) {
        return response.status(400).json(oldCreditCardsOrError.value);
      }

      const oldCreditCards = oldCreditCardsOrError.value;

      return response.status(200).json(oldCreditCards);
    } catch (err) {
      next(err);
    }
  }
}
