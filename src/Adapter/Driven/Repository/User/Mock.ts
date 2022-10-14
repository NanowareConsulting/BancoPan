import { User } from "@/Domain";

import { IUserRepo } from "./index";

export class Mock implements IUserRepo {
  private users: User[] = [];
}
