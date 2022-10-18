import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

import { UCRegisterOldUser } from "@/Domain";

export class CTRLRegisterOldUser {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { cpf, email, name, password } = request.body;

      const oldUserOrError = await UCRegisterOldUser.execute({
        cpf,
        email,
        name,
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

      return response.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  }
}
