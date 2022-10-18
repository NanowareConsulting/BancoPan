import { NextFunction, Request, Response } from "express";

import { Controller } from "../Core";
import { RegisterOldLoanError } from "./Error";
import {
  IUCRegisterOldLoan,
  RegisterOldLoanRequest,
  RegisterOldLoanResponse,
} from "./interface";

export class CTRLRegisterOldLoan implements Controller {
  constructor(private service: IUCRegisterOldLoan) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data: RegisterOldLoanRequest = request.body;

      const result: RegisterOldLoanResponse = await this.service.execute(data);

      if (result.isLeft()) {
        switch (result.value.constructor) {
          case RegisterOldLoanError.CPFDoesNotExist:
            return response.status(404).json({
              message: result.value.message,
            });

          case RegisterOldLoanError.EmailDoesNotExist:
            return response.status(404).json({
              message: result.value.message,
            });

          case RegisterOldLoanError.InvalidCPF:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldLoanError.InvalidEmail:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldLoanError.InvalidExpirationDate:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldLoanError.InvalidNumber:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldLoanError.InvalidSecurityCode:
            return response.status(400).json({
              message: result.value.message,
            });

          default:
            return next(result.value);
        }
      }

      return response.status(201).json({
        message: "OldLoan created successfully",
        data: result.value,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
