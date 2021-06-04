import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';

// Bundles our app by features
@NgModule({
  // Register new components to be used across our module
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    SuccessAlertComponent,
    WarningAlertComponent,
  ],
  // Imports allows us to import other modules
  imports: [FormsModule, BrowserModule],
  providers: [],
  // Since this will be the starting point, the root module into our app,
  // this is telling Angular, what is the component it would inject into
  // the index.html app-root tag, since we are tagging this tag in our
  // AppComponent file.
  // This only tells Angular which component should be aware of at the
  // app starting point to basically recognize it in our index.html file
  bootstrap: [AppComponent],
})
export class AppModule {}
