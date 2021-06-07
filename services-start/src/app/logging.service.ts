// To create a service, we don't need to do nothing in special,
// we don't need to use no decorator, it's a normal file in the end
export class LoggingService {
  logStatusChange(status: string) {
    console.log("A server status changed, new status: " + status);
  }
}
