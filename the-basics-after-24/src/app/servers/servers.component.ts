import { Component, OnInit } from '@angular/core';

@Component({
  // We can use selector with a single string
  selector: 'app-servers',
  // We can use the selector as attribute, and we can now use this
  // component as <div app-servers> instead of using it as element
  // selector: '[app-servers]',
  // Another way of using selector is by class
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  //  Instead of pointing to an url, we ca use inline templates,
  //  like this:
  // template: '<app-server></app-server><app-server></app-server>',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  // Constructor is a method executed at the point of time this
  // component is created by Angular
  constructor() {
    // this would not work in the other syntax because, this would
    // then be referring to something else.
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {}

  // on at the beginning to kind of make clear that this will be
  // triggered from within our template, we don't have to name
  // it on something, but it kind of makes it easier to
  // understand who will call this method.
  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus =
      'Server was created! Name is ' + this.serverName;
  }

  // We have access to the $event that we specified in our template
  // and here we can use it to bind it to a variable
  onUpdateServerName(event: Event) {
    // This sentence in parentheses is just needed to inform
    // TypeScript that we know that the type of the HTML
    // element of this event will be an HTML input element.
    // We do this explicit casting with this syntax, with the
    // opening and closing tag, with the smaller and greater than
    // sign and the type in-between.
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
