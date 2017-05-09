import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../store/data.service';

enum Type { top = 0, new, show, ask, job };

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  errorMsg: string;
  stories: number[];
  currentPage = 0;
  totalPages = 0;
  items: any[]
  storiesPerPage = 20;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    // console.log('item-list component ctor.');
  }

  ngOnInit(): void {
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

    this.currentPage = 0;
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
    // TODO: handle errors
  }

  switchPage(page: number) {
    const start = page * this.storiesPerPage;
    const end = start + this.storiesPerPage;
    const stories = this.stories.slice(start, end);

    this.dataService.getStories(stories)
      .then(items => {
        console.log('stroies updated.');
        this.items = items.filter(x => !!x);
      });

    this.currentPage = page;
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
