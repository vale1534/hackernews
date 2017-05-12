import { Pipe, PipeTransform } from '@angular/core';

import { pluralize } from './utils';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(time: any, args?: any): string {
    const between = Date.now() / 1000 - Number(time);
    if (between < 3600) {
      return pluralize(Math.floor(between / 60), ' minute');
    } else if (between < 86400) {
      return pluralize(Math.floor(between / 3600), ' hour');
    } else {
      return pluralize(Math.floor(between / 86400), ' day');
    }
  }
}
