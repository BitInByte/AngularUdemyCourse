import { Component, EventEmitter, Output } from "@angular/core";
import { AccountsService } from "src/app/accounts.service";
import { LoggingService } from "../logging.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],
  // this is how we inject our service into the constructor
  // providers: [LoggingService],
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

  // We define a constructor which will tell Angular that we need an
  // instance of the defined service
  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService
  ) {
    this.accountsService.statusUpdated.subscribe((status: string) =>
      alert("New Status: " + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    // name: accountName,
    // status: accountStatus,
    // });
    this.accountsService.addAccount(accountName, accountStatus);
    // console.log("A server status changed, new status: " + accountStatus);
    // Now we can access to the service:
    // this.loggingService.logStatusChange(accountStatus);
  }
}
