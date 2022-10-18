import { NextFunction, Request, Response } from "express";

import { AuthProvider } from "@/Adapter";

import { Controller } from "../Core";
import { RegisterOldUserError } from "./Error";
import {
  IUCRegisterOldUser,
  RegisterOldUserRequest,
  RegisterOldUserResponse,
} from "./interface";

export class CTRLRegisterOldUser implements Controller {
  constructor(private service: IUCRegisterOldUser, private auth: AuthProvider) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data: RegisterOldUserRequest = request.body;

      const result: RegisterOldUserResponse = await this.service.execute(data);

      if (result.isLeft()) {
        switch (result.value.constructor) {
          case RegisterOldUserError.InvalidName:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldUserError.InvalidEmail:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldUserError.InvalidPassword:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldUserError.EmailAlreadyExists:
            return response.status(403).json({
              message: result.value.message,
            });

          case RegisterOldUserError.InvalidCPF:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldUserError.CPFAlreadyExists:
            return response.status(403).json({
              message: result.value.message,
            });

          default:
            return next(result.value);
        }
      }

      const token = await this.auth.generateToken(result.value);

      return response.status(201).json({
        message: "OldUser created successfully",
        token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
