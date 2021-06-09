import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // const id = +this.route.snapshot.params["id"];
    // this.server = this.serversService.getServer(id);

    // this.route.params.subscribe((params: Params) => {
    // this.server = this.serversService.getServer(+params["id"]);
    // });
    // we can now use the resolver to get our data
    // the data returned by our resolver, will live
    // in the data as well, like with static data
    this.route.data.subscribe((data: Data) => (this.server = data["server"]));
  }

  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
}
