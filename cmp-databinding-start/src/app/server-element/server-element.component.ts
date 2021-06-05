import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  encapsulation: ViewEncapsulation.Emulated,
})
// We don't need, but is a good practice to implement our hooks
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // @Input will expose this property, in order to be able
  // to pass data, from a parent component, to this component
  // @Input() element: { type: string; name: string; content: string };
  // We can assign an alias, which will be the reference used
  // to pass data to this property, outside of this component,
  // in the selector
  @Input("srvElement") element: { type: string; name: string; content: string };
  @Input() name: string;
  // Getting access to the reference
  @ViewChild("heading", { static: true }) header: ElementRef;
  // Getting access to the reference, which is injected in the ng-content
  @ContentChild("contentParagraph", { static: true }) paragraph: ElementRef;

  constructor() {
    // Will be the first running
    console.log("Constructor called!");
  }

  // ngOnChanges gives us an argument, with all the inputs in there,
  // which tells us what are the inputs, if is the firstChange and,
  // what was the previousChanges
  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!");
    console.log(changes);
  }

  ngOnInit(): void {
    // Will be run after the constructor,
    // everytime the component is created
    console.log("ngOnInit called!");
    console.log("Text content: " + this.header.nativeElement.textContent);
  }

  // Will be executed every change detection run
  // It will get called whenever Angular checks for any changes
  // an event, a promise, a lot of triggers.
  ngDoCheck() {
    console.log("ngDoCheck called!");
  }

  // It is called only once, content is the thing we projected
  // into this through ng-content
  ngAfterContentInit() {
    console.log("ngAfterContentInit called!");
    console.log("Text content: " + this.paragraph.nativeElement.textContent);
  }

  // It is called after each change detection cycle
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called!");
  }

  // Happens after the content has been checked but just one time
  ngAfterViewInit() {
    console.log("ngAfterViewInit called!");
    console.log("Text content: " + this.header.nativeElement.textContent);
  }

  // Happens every time after the content has been checked
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called!");
  }

  // Happens once the component got destroyed
  ngOnDestroy() {
    console.log("ngOnDestroy called!");
  }
}
