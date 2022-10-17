import { NextFunction, Request, Response } from "express";

import { IUCRegisterUser } from "./interface";

export class CTRLRegisterUser {
  constructor(private uc: IUCRegisterUser) {
    this.execute = this.execute.bind(this);
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cpf, email, password } = req.body;

      const user = await this.uc.execute({ name, cpf, email, password });

      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
}
