import { OldUser } from "@/Domain";

export interface OldUserRepository {
  save: (user: OldUser) => Promise<void>;
  findByCPF: (cpf: string) => Promise<OldUser | null>;
}
