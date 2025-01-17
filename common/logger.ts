/**
 * A simple logger interface for logging messages.  Implementations of this interface
 * can provide various logging mechanisms (e.g., console logging, file logging, etc.).
 */
interface ILogger {
  log(message: string): void;
}

/**
 * An abstract base class that provides a logger instance. Subclasses can use this logger
 * for logging messages.
 */
export abstract class WithLogger {
  protected logger: ILogger;
  /**
   * @param logger The logger instance to be used by this object.
   */
  constructor(logger: ILogger) {
    this.logger = logger;
  }
}

/**
 * An abstract base class that provides a logger instance and a name. Subclasses
 * can use the logger for logging messages, incorporating the name for context.
 */
export abstract class WithLoggerAndName {
  protected logger: ILogger;
  protected name: string;
  /**
   * @param logger The logger instance to be used by this object.
   * @param name The name associated with this object.
   */
  constructor(logger: ILogger, name: string) {
    this.logger = logger;
    this.name = name;
  }
}
