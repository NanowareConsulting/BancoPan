import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

export function AuthHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = JWT.verify(token, "secret") as { id: string; cpf: string };

    if (decoded.hasOwnProperty("id") && decoded.hasOwnProperty("cpf")) {
      request.user = {
        id: decoded.id,
        cpf: decoded.cpf,
      };
    }

    return next();
  } catch {
    return response.status(401).json({ message: "Invalid token" });
  }
}
