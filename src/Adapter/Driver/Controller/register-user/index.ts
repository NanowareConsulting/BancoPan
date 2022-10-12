import { Request, Response } from "express";

import { IRegisterUser } from "@/Domain";

import { IController } from "../Core";

export class CTRLRegisterUser implements IController {
  constructor(private service: IRegisterUser) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response): Promise<any> {
    const { name, email, password } = request.body;
    const userOrError = await this.service.execute({
      name,
      email,
      password,
    });

    if (userOrError.isLeft()) {
      return response.status(400).json({
        message: userOrError.value.message,
      });
    }

    return response.status(201).json({
      message: "User created successfully",
    });
  }
}
