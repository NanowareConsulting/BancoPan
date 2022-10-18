import jwt from "jsonwebtoken";

import { OldUser } from "@/Domain";

import { AuthProvider } from "./interface";

export class JWT implements AuthProvider {
  async generateToken(OldUser: OldUser): Promise<string> {
    return jwt.sign(
      { id: OldUser.id, cpf: OldUser.props.cpf.props.value },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
  }

  async verifyToken(token: string): Promise<{
    id: string;
    cpf: string;
  }> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      cpf: string;
    };

    return decoded;
  }
}
