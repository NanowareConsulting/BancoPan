import { User } from "@/Domain";

import { Repo } from "../Core";

export interface UserRepo extends Repo<User> {
  findByEmail(email: string): Promise<User | null>;
}
