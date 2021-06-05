import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  // attribute selector
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // Allows us to bind to properties of the element the directive is
  // placed on
  // This will set a open class to this element if the property
  // isOpen is true and detach it if the isOpen property is false
  @HostBinding('class.open') isOpen = false;
  // Add some functionality to the element which allows us to add a
  // certain CSS class to the element it sits on, once it is clicked and
  // removes the class once we click again.
  // Allows us to create an event to manipulate this directive
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // @HostListener('document:click', ['$event']) toggleOpenDocument(event: Event) {
  // this.isOpen = this.elRef.nativeElement.contains(event.target)
  // ? !this.isOpen
  // : false;
  // }

  // constructor(private elRef: ElementRef) {}
}
