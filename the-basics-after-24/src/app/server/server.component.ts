import { Component } from '@angular/core';

// @Component is a decorator which will tell Angular that
// this call is to be treated as a component
@Component({
  // Selector is the HTML tag by which we're able to use
  // this component later in our other components templates.
  // Typically we prefix this selector with app- and then
  // a name of our choice. This must be unique though.
  selector: 'app-server',
  // This will be the template we want to use for this component.
  // The path here is a relative path
  templateUrl: './server.component.html',
  styles: [
    `
      .online {
        color: white;
      }
    `,
  ],
})
// A Angular component is just a class in the end
// We need to export it in order to be able to use it outside
export class ServerComponent {
  // This is the state properties which can then be injected to
  // our template via string interpolation
  serverId: number = 10;
  serverStatus: string = 'offline';

  // Constructor is called once this component is created
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  // We can also use the return of a method in our string interpolation
  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
