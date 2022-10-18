import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

import { UCLogInOldUser } from "@/Domain";

export class CTRLLogInOldUser {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { cpf, password } = request.body;

      const oldUserOrError = await UCLogInOldUser.execute({
        cpf,
        password,
      });

      if (oldUserOrError.isLeft()) {
        return response.status(400).json(oldUserOrError.value.message);
      }

      const oldUser = oldUserOrError.value;

      const token = JWT.sign(
        {
          id: oldUser.id,
          cpf: oldUser.cpf,
        },
        "secret",
        {
          expiresIn: "1d",
        }
      );

      return response.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}
