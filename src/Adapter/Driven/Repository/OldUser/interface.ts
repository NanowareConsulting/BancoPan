import { OldUser } from "@/Domain";

import { Repo } from "../Core";

export interface OldUserRepo extends Repo<OldUser> {
  findByEmail(email: string): Promise<OldUser | null>;
  findByCPF(cpf: string): Promise<OldUser | null>;
}
