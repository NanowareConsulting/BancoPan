import bcrypt from "bcrypt";

import { IEncryptionProvider } from "./interface";

export class EncryptionProvider implements IEncryptionProvider {
  private readonly salt: number;

  constructor() {
    this.salt = 10;
  }

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
