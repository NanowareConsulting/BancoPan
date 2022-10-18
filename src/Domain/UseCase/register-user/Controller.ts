import { NextFunction, Request, Response } from "express";

import { IUCRegisterUser } from "./interface";

export class CTRLRegisterUser {
  constructor(private uc: IUCRegisterUser) {
    this.execute = this.execute.bind(this);
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, user } = req;
      const { name, email, password } = body;
      const { cpf } = user;

      const newUser = await this.uc.execute({ name, cpf, email, password });

      return res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
