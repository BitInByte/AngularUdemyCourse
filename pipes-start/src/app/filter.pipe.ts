import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  // This will enforce that our pipe will be
  // recalculated whenever the data changes
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    // If there is no values on the array, we just
    // return it
    if (value.length === 0 || filterString === "") {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
