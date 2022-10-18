import { NextFunction, Request, Response } from "express";

import { AuthProvider } from "@/Adapter";

import { Controller } from "../Core";
import { GetUserDataError } from "./Error";
import {
  GetUserDataRequest,
  GetUserDataResponse,
  IUCGetUserData,
} from "./interface";

export class CTRLGetUserData implements Controller {
  constructor(private service: IUCGetUserData, private auth: AuthProvider) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data: GetUserDataRequest = request.user;

      const result: GetUserDataResponse = await this.service.execute(data);

      if (result.isLeft()) {
        switch (result.value.constructor) {
          case GetUserDataError.UserNotFound:
            return response.status(404).json({
              message: "User not found",
            });

          default:
            return next(result.value);
        }
      }

      return response.status(200).json({
        message: "User data",
        data: result.value,
      });
    } catch (err) {
      next(err);
    }
  }
}
