import { NextFunction, Request, Response } from "express";

export function ErrorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(500).json({ message: "Server Error!" });
}
