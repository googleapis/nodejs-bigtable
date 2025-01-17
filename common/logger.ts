interface ILogger {
  log(message: string): void;
}

export abstract class WithLogger {
  protected logger: ILogger;
  constructor(logger: ILogger) {
    this.logger = logger;
  }
}

export abstract class WithLoggerAndName {
  protected logger: ILogger;
  protected name: string;
  constructor(logger: ILogger, name: string) {
    this.logger = logger;
    this.name = name;
  }
}
