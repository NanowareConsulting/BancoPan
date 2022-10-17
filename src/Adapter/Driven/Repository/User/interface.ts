import { User } from "@/Domain";

export interface IUserRepo {
  create(user: User): Promise<User>;
  findByCpf(cpf: string): Promise<User>;
}
