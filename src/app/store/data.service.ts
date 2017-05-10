import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { Subject } from 'rxjs/Subject';
import * as lscache from 'lscache';

@Injectable()
export class DataService {
  // Stories type is number[]
  storiesList = [
    new Subject<number[]>(),  // top
    new Subject<number[]>(),  // new
    new Subject<number[]>(),  // show
    new Subject<number[]>(),  // ask
    new Subject<number[]>()   // jobs
  ];

  topicsList = [
    'topstories', 'newstories', 'showstories', 'askstories', 'jobstories'
  ];

  // Initialize empty caches for stories
  cacheList: Array<number[]> = [[], [], [], [], []];

  constructor(private api: ApiService) {
    for (let i = 0; i < 5; ++i) {
      api.getRef(this.topicsList[i]).on('value', snapshot => {
        const items = snapshot.val();
        if (items && items.length > 0) {
          this.cacheList[i] = items;
          this.storiesList[i].next(this.cacheList[i]);
        }
      });
    }
  }

  getStoriesSubject(id: number) {
    // TODO: handle out of range error?
    return this.storiesList[id];
  }

  updateStories(id: number) {
    // TODO: handle out of range error?
    const stories = this.storiesList[id];
    const cache = this.cacheList[id];
    // Don't push empty items
    if (cache && cache.length > 0) {
      stories.next(cache);
    }
  }

  getStories(stories: number[]) {
    lscache.flushExpired();
    return Promise.all(stories.map(story => {
      const key = '' + story;
      const hit = lscache.get(key);
      if (hit) return Promise.resolve(hit);
      return this.api.fetchItem(story)
        .then(item => {
          lscache.set(key, item, 15);
          return item;
        });
    }));
  }

  getStory(id: number) {
    return this.api.fetchItem(id)
      .then(item => {
        lscache.set(String(id), item, 15);
        return item;
      });
  }

  getUser(id: string) {
    return this.api.fetchUser(id);
  }

  getData(topic: string) {
    return this.api.fetch(topic);
  }

  getRef(topic: string) {
    return this.api.getRef(topic);
  }
}
