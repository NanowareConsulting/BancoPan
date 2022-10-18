import { NextFunction, Request, Response } from "express";

import { UCGetOldUser } from "@/Domain";

export class CTRLGetOldUser {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { cpf } = request.user;

      const oldUserOrError = await UCGetOldUser.execute({
        cpf,
      });

      if (oldUserOrError.isLeft()) {
        return response.status(400).json(oldUserOrError.value.message);
      }

      const oldUser = oldUserOrError.value;

      return response.status(200).json(oldUser);
    } catch (err) {
      next(err);
    }
  }
}
