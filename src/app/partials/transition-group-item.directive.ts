import { Directive, ElementRef } from '@angular/core';

// Ref: http://stackoverflow.com/questions/43928524/how-to-implement-item-reorder-shuffle-animations-with-angulars-ngfor

@Directive({
  selector: '[transition-group-item]'
})
export class TransitionGroupItemDirective {
  prevPos: ClientRect;
  newPos: ClientRect;
  el: HTMLElement;
  moved: boolean;
  moveCallback: any;

  constructor(elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }

  get clientRect(): ClientRect {
    const bound = this.el.getBoundingClientRect();
    // bound.top += document.body.scrollTop;
    return {...bound, top: bound.top + document.body.scrollTop};
  }
}
