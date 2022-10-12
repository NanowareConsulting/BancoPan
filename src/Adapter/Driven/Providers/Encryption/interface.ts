export interface IEncryptionProvider {
  encrypt: (value: string) => Promise<string>;
  compare: (value: string, hash: string) => Promise<boolean>;
}
