import { OldCreditCard } from "@/Domain";

export interface OldCreditCardRepository {
  save: (creditCard: OldCreditCard) => Promise<void>;
  findByCPF: (cpf: string) => Promise<OldCreditCard | null>;
}
