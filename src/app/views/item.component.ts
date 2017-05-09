import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  viewItem(): void {
    console.log('view', this.item);
    this.router.navigate(['story', this.item.id]);
  }
}
