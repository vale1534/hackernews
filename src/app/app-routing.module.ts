import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListComponent } from './views/item-list.component';
import { StoryComponent } from './views/story.component';

const routes: Routes = [
  { path: '', redirectTo: 'top', pathMatch: 'full' },
  { path: 'story/:id', component: StoryComponent },
  { path: ':stories', component: ItemListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
