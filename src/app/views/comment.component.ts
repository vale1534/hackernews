import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../store/data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() kid: number;
  comment: any;
  hidden = false;
  repliesHidden = true;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getStory(this.kid)
      .then(comment => this.comment = comment);
  }

  viewUser(): void {
    this.router.navigate(['user', this.comment.by]);
  }

  get replies(): number[] {
    return this.comment && this.comment.kids ? this.comment.kids : [];
  }

  get pluralizeReplies(): string {
    const num = this.replies.length;
    return num > 1 ? `${num} replies` : `${num} reply`;
  }
}
