import JWT from "jsonwebtoken";

import { IAuthProvider } from "./interface";

type Payload = {
  id: string;
  cpf: string;
};

export class JWTAuthProvider implements IAuthProvider<Payload> {
  generateToken(payload: Payload): string {
    return JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  verifyToken(token: string): Payload | false {
    try {
      return JWT.verify(token, process.env.JWT_SECRET) as Payload;
    } catch (error) {
      return false;
    }
  }
}
