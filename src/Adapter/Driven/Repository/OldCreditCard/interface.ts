import { OldCreditCard } from "@/Domain";

import { Repo } from "../Core";

export interface OldCreditCardRepo extends Repo<OldCreditCard> {
  findByEmail(email: string): Promise<OldCreditCard[] | null>;
  findByCPF(cpf: string): Promise<OldCreditCard[] | null>;
}
