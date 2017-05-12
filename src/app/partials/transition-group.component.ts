import { Component, AfterViewInit, Input } from '@angular/core';
import { ContentChildren, QueryList } from '@angular/core';
import { TransitionGroupItemDirective as ItemDirective } from './transition-group-item.directive';

// Ref: http://stackoverflow.com/questions/43928524/how-to-implement-item-reorder-shuffle-animations-with-angulars-ngfor

@Component({
  selector: '[transition-group]',
  template: '<ng-content></ng-content>'
})
export class TransitionGroupComponent implements AfterViewInit {
  @ContentChildren(ItemDirective) items: QueryList<ItemDirective>;

  ngAfterViewInit(): void {
    this.items.forEach(it => it.prevPos = it.clientRect);
    this.items.changes.subscribe(items => {
      // debugger;
      items.forEach(it => it.prevPos = it.newPos || it.prevPos || it.clientRect);
      items.forEach(it => it.moveCallback && it.moveCallback());
      items.forEach(it => it.newPos = it.clientRect);
      items.forEach(it => this.revertPosition(it));
      // Force reflow
      // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
      const _ = document.body.offsetHeight;
      items.forEach(it => this.playAnimation(it));
    });
  }

  revertPosition(it: ItemDirective): void {
    it.moved = false;
    const dx = it.prevPos.left - it.newPos.left;
    const dy = it.prevPos.top - it.newPos.top;
    // console.log('dxy:', dx, dy);
    if (dy) {
      it.moved = true;
      const style = it.el.style;
      style.transform = style.webkitTransform = `translateY(${dy}px)`;
      style.transitionDuration = '0s';
      // console.log('revertPosition', dy);
    }
  }

  playAnimation(it: ItemDirective): void {
    if (!it.moved) {
      return;
    }

    const style = it.el.style;
    it.el.classList.add('transition-group-item-moved');
    style.transform = style.webkitTransform = style.transitionDuration = '';
    it.moveCallback = (evt: any) => {
      // console.log(evt, 'called');
      if (!evt || /transform$/.test(evt.propertyName)) {
        it.el.removeEventListener('transitionend', it.moveCallback);
        it.el.classList.remove('transition-group-item-moved');
        it.moveCallback = null;
        // console.log(evt, 'solved');
      }
    };
    it.el.addEventListener('transitionend', it.moveCallback);
  }
}
