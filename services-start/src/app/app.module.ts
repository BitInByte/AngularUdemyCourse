import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AccountComponent } from "./account/account.component";
import { NewAccountComponent } from "./new-account/new-account.component";
import { AccountsService } from "src/app/accounts.service";
import { LoggingService } from "./logging.service";

@NgModule({
  declarations: [AppComponent, AccountComponent, NewAccountComponent],
  imports: [BrowserModule, FormsModule],
  // We are making sure that everything in our application receives the
  // same instance of the service, unless we overwrite it.
  // providers: [AccountsService, LoggingService],
  providers: [LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
