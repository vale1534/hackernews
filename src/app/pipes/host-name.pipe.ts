import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hostName' })
export class HostNamePipe implements PipeTransform {
  transform(url: string, args?: any): string {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const parts = host.split('.').slice(-3);
    if (parts[0] === 'www') parts.shift();
    return parts.join('.');
  }
}
