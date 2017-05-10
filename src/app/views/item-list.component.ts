import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate, group, keyframes } from '@angular/animations';

import { DataService } from '../store/data.service';

enum Type { top = 0, new, show, ask, job };

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('ready', style({transform:'translateX(0)',opacity:1})),
      state('slideleft', style({transform:'translateX(-10px)',opacity:0})),
      state('slideright', style({transform:'translateX(10px)',opacity:0})),
      transition('* => slideleft', [
        animate('100ms cubic-bezier(.55,0,.1,1)', keyframes([
          style({transform:'translateX(0px)',opacity:1}),
          style({transform:'translateX(30px)',opacity:0}),
        ]))
      ]),
      transition('* => slideright', [
        animate('100ms cubic-bezier(.55,0,.1,1)', keyframes([
          style({transform:'translateX(0px)',opacity:1}),
          style({transform:'translateX(-30px)',opacity:0}),
        ]))
      ]),
      transition('* => ready', animate('50ms ease-in'))
    ])
  ]
})
export class ItemListComponent implements AfterViewInit, OnDestroy {
  errorMsg: string;
  stories: number[];
  currentPage = -1;
  totalPages = 0;
  storiesPerPage = 20;
  subscription: Subscription;
  items: any[];
  newItems: any[];
  slideState: 'slideleft' | 'slideright' | 'ready';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngAfterViewInit(): void {
    this.route.params.subscribe(
      param => this.routeParamsChanged(param),
      error => console.error(error)
    );
  }

  routeParamsChanged(param: {[key: string]: string}): void {
    console.log(`route param changed: ${param.stories}`);
    const type = Type[param.stories] as number;
    if (typeof type === 'undefined') {
      // TODO: Handling undefined type
      return;
    }

    this.currentPage = -1;
    this.slideState = 'ready';
    this.newItems = undefined;
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    
    const subject = this.dataService.getStoriesSubject(type);
    this.subscription = subject.subscribe(
      stories => this.updateStories(stories),
      error => this.handleError(error)
    );

    // Update immediately
    this.dataService.updateStories(type);
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  updateStories(stories: number[]) {
    const pages = stories.length / this.storiesPerPage;
    this.totalPages = Math.ceil(pages);
    this.stories = stories;
    this.switchPage(this.currentPage);
  }

  handleError(error: any) {
    throw new Error('Method not implemented.');
  }

  switchPage(page: number) {
    if (page < 0) page = 0;
    const start = page * this.storiesPerPage;
    const end = start + this.storiesPerPage;
    const stories = this.stories.slice(start, end);

    this.dataService.getStories(stories)
      .then(items => {
        if (items && items.length) {
          console.log('stroies updated.');
          if (page > this.currentPage) {
            this.slideState = 'slideright';
            this.currentPage = page;
          } else if (page < this.currentPage) {
            this.slideState = 'slideleft';
            this.currentPage = page;
          }
          this.newItems = items.filter(item => !!item);
        } else {
          console.error('receiving empty items');
        }
      });
  }

  animationDone(): void {
    // Avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this._animationDone(), 0);
  }

  _animationDone(): void {
    console.log('slideState', this.slideState);
    if (this.slideState !== 'ready') {
      this.items = this.newItems;
      this.slideState = 'ready';
    }
  }

  prevPage(): void {
    this.hasPrevPages() && this.switchPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.hasMorePages() && this.switchPage(this.currentPage + 1);
  }

  hasPrevPages(): boolean {
    return this.currentPage > 0;
  }

  hasMorePages(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  trackItem(index: any, item: any): number {
    // console.log(`track: ${item.id}`);
    return item && item.id;
  }
}
