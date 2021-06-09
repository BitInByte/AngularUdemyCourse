import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

// Instead of adding it to providers array in the module, we can just tell
// as metadata in the @Injectable
@Injectable({ providedIn: "root" })
export class UserService {
  // activatedEmitter = new EventEmitter<boolean>();
  activatedEmitter = new Subject<boolean>();
}
