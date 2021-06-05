import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
// In the end we will use property binding, because Angular transforms
// it for us into an ng-template component, because, that is what it gets
// transformed by Angular if we use the star.
export class UnlessDirective {
  // set turns this input into a method but, this still is a property,
  // it's just a setter of the property which is a method which gets
  // executed whenever the property changes and it changes whenever it
  // changes outside of this directive, so, whenever the condition
  // we pass changes or some parameter of this condition.
  // The name here needs to match the name of our selector
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // This method, createEmbeddedView, will create a view in this
      // view container.
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // Remove everything from this place in the DOM
      this.vcRef.clear();
    }
  }

  // Just like ElementRef gave us access to the element the directive was on,
  // TemplateRef does the same for a template
  // We can also get the View container, so, where should we render it,
  // the template is the what, now the question is where.
  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
