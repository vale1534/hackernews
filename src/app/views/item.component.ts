import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: any

  constructor(private router: Router) {}

  ngOnInit(): void {
    //console.log(this.item);
  }

  isJobItem(): boolean {
    return this.item.type === 'job';
  }

  viewStory(): void {
    // console.log('view story:', this.item.id);
    this.router.navigate(['story', this.item.id]);
  }

  viewUser(): void {
    // console.log('view user info:', this.item.by);
    this.router.navigate(['user', this.item.by]);
  }
}
