import { OldLoan } from "@/Domain";

import { Repo } from "../Core";

export interface OldLoanRepo extends Repo<OldLoan> {
  findByEmail(email: string): Promise<OldLoan[] | null>;
  findByCPF(cpf: string): Promise<OldLoan[] | null>;
}
