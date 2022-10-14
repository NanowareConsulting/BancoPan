import { User } from "@/Domain";

import { Repo } from "../Core";

export interface IUserRepo extends Repo<User> {
  findByEmail(email: string): Promise<User>;
}
