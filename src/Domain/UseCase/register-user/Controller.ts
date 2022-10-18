import { NextFunction, Request, Response } from "express";

import { AuthProvider } from "@/Adapter";

import { Controller } from "../Core";
import { RegisterUserError } from "./Error";
import {
  IUCRegisterUser,
  RegisterUserRequest,
  RegisterUserResponse,
} from "./interface";

export class CTRLRegisterUser implements Controller {
  constructor(private service: IUCRegisterUser, private auth: AuthProvider) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data: RegisterUserRequest = request.body;

      const result: RegisterUserResponse = await this.service.execute(data);

      if (result.isLeft()) {
        switch (result.value.constructor) {
          case RegisterUserError.InvalidName:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterUserError.InvalidEmail:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterUserError.InvalidPassword:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterUserError.EmailAlreadyExists:
            return response.status(403).json({
              message: result.value.message,
            });

          default:
            return next(result.value);
        }
      }

      return response.status(201).json({
        message: "User created successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
