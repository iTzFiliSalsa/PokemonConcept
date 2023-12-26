import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[showNeoris]'
})
export class ShowIfIsNeorisDirective{

  @Input()
  set showNeoris(value: boolean){
    if(value)
      this.viewContainer.createEmbeddedView(this.template);
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

}
