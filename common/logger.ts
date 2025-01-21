// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
   * @param {ILogger} logger The logger instance to be used by this object.
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
   * @param {ILogger} logger The logger instance to be used by this object.
   * @param {string} name The name associated with this object.
   */
  constructor(logger: ILogger, name: string) {
    this.logger = logger;
    this.name = name;
  }
}
