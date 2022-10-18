import { NextFunction, Request, Response } from "express";

import { Controller } from "../Core";
import { RegisterOldCreditCardError } from "./Error";
import {
  IUCRegisterOldCreditCard,
  RegisterOldCreditCardRequest,
  RegisterOldCreditCardResponse,
} from "./interface";

export class CTRLRegisterOldCreditCard implements Controller {
  constructor(private service: IUCRegisterOldCreditCard) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { cpf } = request.user;
      const { email } = request.body;

      const result: RegisterOldCreditCardResponse = await this.service.execute({
        cpf,
        email,
      });

      if (result.isLeft()) {
        switch (result.value.constructor) {
          case RegisterOldCreditCardError.CPFDoesNotExist:
            return response.status(404).json({
              message: result.value.message,
            });

          case RegisterOldCreditCardError.EmailDoesNotExist:
            return response.status(404).json({
              message: result.value.message,
            });

          case RegisterOldCreditCardError.InvalidCPF:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldCreditCardError.InvalidEmail:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldCreditCardError.InvalidExpirationDate:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldCreditCardError.InvalidNumber:
            return response.status(400).json({
              message: result.value.message,
            });

          case RegisterOldCreditCardError.InvalidSecurityCode:
            return response.status(400).json({
              message: result.value.message,
            });

          default:
            return next(result.value);
        }
      }

      return response.status(201).json({
        message: "OldCreditCard created successfully",
        data: result.value,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
