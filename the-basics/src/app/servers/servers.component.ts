import { Component, OnInit } from '@angular/core';

@Component({
  // We can use selector with a single string
  selector: 'app-servers',
  // We can use the selector as attribute, and we can now use this
  // component as <div app-servers> instead of using it as element
  // selector: '[app-servers]',
  // Another way of using selector is by class
  // selector: '.app-servers',
  // templateUrl: './servers.component.html',
  //  Instead of pointing to an url, we ca use inline templates,
  //  like this:
  template: '<app-server></app-server><app-server></app-server>',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
