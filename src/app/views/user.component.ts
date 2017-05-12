import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../store/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  id: string;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.routeParamsChanged(params),
      error => this.handleError(error)
    );
  }

  get submissions() {
    return this.user.submitted ? this.user.submitted.length : 0;
  }

  get submittedUrl() {
    return `https://news.ycombinator.com/submitted?id=${this.user.id}`;
  }

  routeParamsChanged(params: { [key: string]: string }) {
    // console.log(params.id);
    this.id = params.id;
    this.dataService.getUser(this.id)
      .then(user => this.user = user);
  }

  handleError(error: any) {
    throw new Error('Method not implemented.');
  }
}
