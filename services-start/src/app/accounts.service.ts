import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

// @Injectable tells Angular that something can be injected here,
// like the loggingService that we have here.
// This need to be done because, Angular always need metadata
// @Injectable()
// Instead of adding this service to the app module to be
// accessible everywhere, we can add the providedIn metadata
// and specify that we want to provide it from the root
// tree. This can only be done since Angular 6+
@Injectable({ providedIn: "root" })
export class AccountsService {
  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Testaccount",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
