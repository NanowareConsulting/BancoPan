import { OldUser, User } from "@/Domain";

export interface AuthProvider {
  generateToken(user: OldUser): Promise<string>;
  verifyToken(token: string): Promise<{
    id: string;
    cpf: string;
  }>;
}
