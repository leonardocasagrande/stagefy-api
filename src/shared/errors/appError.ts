class AppError {
  public readonly errorDescription: unknown;

  public readonly interfaceMessage: string;

  public readonly statusCode: number;

  constructor(
    interfaceMessage: string,
    statusCode = 400,
    errorDescription?: unknown,
  ) {
    this.interfaceMessage = interfaceMessage;
    this.errorDescription = errorDescription;
    this.statusCode = statusCode;
  }
}

export default AppError;
