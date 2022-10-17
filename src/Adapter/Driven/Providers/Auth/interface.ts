export interface IAuthProvider<T> {
  generateToken(payload: T): string;
  verifyToken(token: string): T | false;
}
