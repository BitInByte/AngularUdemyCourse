import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersService } from "./servers/servers.service";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

// We don't need to install nothing, Angular already
// has such tool to deal with router.
const appRoutes: Routes = [
  // This is just the unhandled url
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [
      // { path: "users/:id/:name", component: UserComponent }, // localhost:4200/users
      { path: ":id/:name", component: UserComponent }, // localhost:4200/users
    ],
  }, // localhost:4200/users
  {
    path: "servers",
    // canActivate takes an array of all guards we want
    // to apply to this route and it will automatically
    // get applied to all the child routes
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      // { path: "servers/:id", component: ServerComponent },
      {
        path: ":id",
        component: ServerComponent,
        // This will map the data, which this resolver gives us back
        // which will be called with the method, resolve, by Angular, when
        // this route is loaded, will be stored in a server object,
        // since we specified a key server in the resolve object
        resolve: { server: ServerResolver },
      },
      // { path: "servers/:id/edit", component: EditServerComponent },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // { path: "not-found", component: PageNotFoundComponent },
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" },
  },
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [
    // We need to specify the routes we want to use with the
    // foRoot, pacing the array with the route objects to it
    // RouterModule.forRoot(appRoutes, { useHash: true }),
    RouterModule.forRoot(appRoutes),
  ],
  // exports simply tells Angular that from this module,
  // if we add this module in the imports of another
  // module, whis should be accessible there
  exports: [RouterModule],
})
export class AppRoutingModule {}
