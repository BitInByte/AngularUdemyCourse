import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  // We can retrieve data passed from the element this directive sits on
  @Input() defaultColor: string = "transparent";
  @Input("appBetterHighlight") highlightColor: string = "blue";
  // To @HostBinding, we can pass a string defining to which property of the
  // hosting element we want to bind.
  // What we're telling Angular is, on the element this directive sits,
  // we want to retrieve the style property and then there a sub-property,
  // the backgroundColor
  // @HostBinding("style.backgroundColor") backgroundColor: string = "transparent";
  @HostBinding("style.backgroundColor") backgroundColor: string;

  // Since Angular is able to render our templates without a DOM, we
  // should access the element with the Renderer2 instead
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // This Renderer2 exposes a couple of helper methods we can us to work
    // with the DOM
    // Renderer2 needs the element which we can get from the ElementRef which is
    // passed as first argument, the second argument is the style we want
    // to change and the third element is the value of that style
    // The last argument, is a flags object, and we can set a couple of flags.
    // What we can set as flags are things like if we want to add an important
    // tag, for example the !important annotation for a style to
    // override other styles
    // this.renderer.setStyle(
    // this.elRef.nativeElement,
    // "background-color",
    // "blue"
    // );
    this.backgroundColor = this.defaultColor;
  }

  // We can react to events occurring to the element this
  // directive sits on with @HostListener
  // HostListener takes an argument name as an input ant that would be
  // whichever event we want to listen for
  // We have all event available, we could also use with event binding before
  // We could also listen to custom event and retrieve that data, so, that's
  // just like the method we execute when we add a click listener and then
  // pass the method between quotation marks, @HostListener is just a
  // convenient way of listening to events on that element
  @HostListener("mouseenter") mouseover(eventData: Event) {
    // this.renderer.setStyle(
    // this.elRef.nativeElement,
    // "background-color",
    // "blue"
    // );
    // this.backgroundColor = "blue";
    // this.backgroundColor = "blue";
    this.backgroundColor = this.highlightColor;
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    // this.elRef.nativeElement,
    // "background-color",
    // "transparent"
    // );
    // this.backgroundColor = "transparent";
    this.backgroundColor = this.defaultColor;
  }
}
