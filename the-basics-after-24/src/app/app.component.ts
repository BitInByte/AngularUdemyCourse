import { Component } from '@angular/core';

// This component will serve as our root component in our app
@Component({
  // Selecting a tag element in the index.html file to target our template
  // in the app.component.html file injecting in this selector tag
  selector: 'app-root',
  templateUrl: './app.component.html',
  // Giving styles to the component, based on a css file
  // styleUrls: ['./app.component.css'],
  // We can also use inline styling with the styles property
  styles: [
    `
      h3 {
        color: dodgerBlue;
      }
    `,
  ],
})
export class AppComponent {}
