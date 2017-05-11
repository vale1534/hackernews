import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataService } from './store/data.service';
import { ApiService } from './store/api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './views/item-list.component';
import { ItemComponent } from './views/item.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HostNamePipe } from './pipes/host-name.pipe';
import { StoryComponent } from './views/story.component';
import { UserComponent } from './views/user.component';
import { CommentComponent } from './views/comment.component';
import { AnimateCubeComponent } from './partials/animate-cube.component';
import { AnimatePulseComponent } from './partials/animate-pulse.component';
import { AnimateWaveComponent } from './partials/animate-wave.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemComponent,
    TimeAgoPipe,
    HostNamePipe,
    StoryComponent,
    UserComponent,
    CommentComponent,
    AnimateCubeComponent,
    AnimatePulseComponent,
    AnimateWaveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [DataService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
