export abstract class ServiceHandler {
  /*
  callHandler accepts a grpc call and provides behaviour for that grpc call
  which may involve sending errors or data back to the client for
  example.
  */
  abstract callHandler(call: any): void;

  /*
  snapshotOutput is used to provide a custom json object that represents the
  results of the test that was run with this service handler.
   */
  abstract snapshotOutput(): any;

  /*
  setupService is called to setup the service we use for collecting data about
  a running test.
   */
  abstract setupService(): void;
}
