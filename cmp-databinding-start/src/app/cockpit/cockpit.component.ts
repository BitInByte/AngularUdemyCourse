import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
export class CockpitComponent implements OnInit {
  // To listen to an event, we need to sing the property
  // we want to assign the event, a new value, EventEmitter.
  // This type is a generic type, which we need to assign
  // the type of values we want to pass at the event object
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  // We can also attribute an alias to an event
  @Output("bpCreated") blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  // newServerName = "";
  // newServerContent = "";
  // We can get access to our reference in out typescript with
  // ViewChild
  // We need to pass static in order to use it in ngOnInit
  // The first argument, is the name of the reference we specified
  // in the element on the template
  @ViewChild("serverContentInput", { static: true })
  serverContentInput: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  // @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  // We can now use the Custom event we just created, to pass
  // the data to the parent component
  // Since we added a reference to the input element, and we
  // passed it to this method here, we can use it to fetch the input
  // it has in it
  onAddServer(nameInput: HTMLInputElement) {
    console.log(nameInput.value);
    this.serverCreated.emit({
      // serverName: this.newServerName,
      serverName: nameInput.value,
      // serverContent: this.newServerContent,
      // We can now use the nativeElement to get access to the
      // element itself
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      // serverName: this.newServerName,
      serverName: nameInput.value,
      // serverContent: this.newServerContent,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}
