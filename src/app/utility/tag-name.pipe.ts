import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagName'
})
export class TagNamePipe implements PipeTransform {

  transform(tags: any[]): string {
    if (!tags || !tags.length) return '';

    return tags.map(tag => {
      return tag.capacity
        ? `${tag.proposalItemTagName} (${tag.capacity})`
        : tag.proposalItemTagName;
    }).join(', ');
  }

}