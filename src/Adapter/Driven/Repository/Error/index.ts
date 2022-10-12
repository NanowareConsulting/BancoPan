export class RepositoryError extends Error {
  public readonly repository: string;
  public readonly method: string;
  public readonly status: number;

  constructor(
    repository: string,
    method: string,
    status: number,
    message: string
  ) {
    super(message);
    this.repository = repository;
    this.method = method;
    this.status = status;
  }
}
