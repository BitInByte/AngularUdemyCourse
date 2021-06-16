import { Pipe, PipeTransform } from "@angular/core";

// We need to implement PipeTransform to
// force us to implement a special method
// We also need to add a special decorator,
// the @Pipe decorator
@Pipe({
  // Specify the name for the pipe
  name: "shorten",
})
export class ShortenPipe implements PipeTransform {
  // This transform method always receives a value
  // which will be transformed and the arguments
  // as second argument
  transform(value: any, limit: number, anotherArg: any) {
    // It always need to return something
    // substr is a builtin javascript method
    // which allow us to cut our string
    // The first argument is the index
    // where it should start and the second
    // is the length
    if (value.length > limit) {
      return value.substr(0, limit) + "...";
    }
    return value;
  }
}
