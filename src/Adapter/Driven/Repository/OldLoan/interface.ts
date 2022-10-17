import { OldLoan } from "@/Domain";

export interface OldLoanRepository {
  save: (user: OldLoan) => Promise<void>;
  findByCPF: (cpf: string) => Promise<OldLoan | null>;
}
