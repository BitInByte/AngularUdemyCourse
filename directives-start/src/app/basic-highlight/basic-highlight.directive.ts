import { Directive, ElementRef, OnInit } from "@angular/core";

// To create our own directive, we need to decorate it
// with the Directive decorator
@Directive({
  // This will represent the name of this directive which
  // can be used in the element. This should be unique
  // We add the square brackets which means that this will now
  // be recognized whenever we add appBasicHighlight without
  // square brackets to an element
  selector: "[appBasicHighlight]",
})
export class BasicHighlightDirective implements OnInit {
  // Angular gives us access to the element
  // this directive will sit on
  // We can inject the element the directive sits
  // on into this directive
  // Angular will try to create an instance of the
  // class we need and will give it to us
  constructor(private elementRef: ElementRef) {}

  // Directive also has the ngOnInit lifecycle hook
  ngOnInit() {
    // We are getting access to the element the directive was placed on,
    // getting access to that exact element and then, we're overriding
    // the style of this element
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}
