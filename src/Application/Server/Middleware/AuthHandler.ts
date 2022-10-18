import { NextFunction, Request, Response } from "express";

import { AuthProvider } from "@/Adapter";

export class AuthHandler {
  constructor(private AuthProvider: AuthProvider) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({ error: "No token provided" });
    }

    const [bearer, token] = auth.split(" ");

    if (!bearer || bearer !== "Bearer") {
      return res.status(401).json({ error: "Token malformatted" });
    }

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const user = await this.AuthProvider.verifyToken(token);
      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
}
