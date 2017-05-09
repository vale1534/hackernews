import { Injectable } from '@angular/core';
import * as Firebase from 'firebase';
// import { Observable } from "rxjs/Observable";
// import { Observable }

const debugMode = true;
const version = '/v0';
const config = {
  databaseURL: 'https://hacker-news.firebaseio.com'
}

function log(msg: string) {
  debugMode && console.log(msg);
}

@Injectable()
export class ApiService {
  ref: Firebase.database.Reference;
  cachedItems: any;

  constructor() {
    Firebase.initializeApp(config);
    this.ref = Firebase.database().ref(version);
  }

  getRef(child: string): Firebase.database.Reference {
    return this.ref.child(child);
  }

  fetch(child: string): Promise<any> {
    //log(`fetching ${child}`);
    const cache = false;//localStorage.getItem(child);
    if (cache) {
      //log(`cache hit for ${child}`);
      return Promise.resolve(JSON.parse(cache));
    } else {
      return new Promise((resolve, reject) => {
        this.ref.child(child).once('value', snapshot => {
          const val = snapshot.val();
          localStorage.setItem(child, JSON.stringify(val));
          resolve(val);
        }, reject);
      });
    }
  }

  fetchItem(id: number): Promise<any> {
    return this.fetch('item/' + id);
  }

  fetchItems(ids: number[]): Promise<any[]> {
    return Promise.all(ids.map(id => this.fetchItem(id)));
  }
}
