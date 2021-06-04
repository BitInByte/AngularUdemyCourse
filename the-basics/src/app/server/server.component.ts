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
})
// A Angular component is just a class in the end
// We need to export it in order to be able to use it outside
export class ServerComponent {}
