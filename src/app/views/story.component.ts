import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../store/data.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  id: string;
  story: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.routeParamsChanged(params),
      error => this.handleError(error)
    );
  }

  routeParamsChanged(params: { [key: string]: string }): void {
    this.id = params.id;
    this.dataService.getStory(Number(this.id))
      .then(story => {
        if (!story) return;
        story.kids = story.kids || [];
        this.story = story;
      });
  }

  handleError(error: any): void {
    throw new Error(`Unhandle error ${error.message}`);
  }

  viewUser(): void {
    // console.log('view user info:', this.story.by);
    this.router.navigate(['user', this.story.by]);
  }
}
