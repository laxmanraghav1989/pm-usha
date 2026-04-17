import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchTxt: string,key:string[]): any {
    if(!items || !items.length) return items;
    if(!searchTxt || !searchTxt.length) return items;
    // return items.filter(item => {
    //   return item.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    // });
  //   return items.filter(function(item){
  //     return JSON.stringify(item).toLowerCase().includes(searchTxt.toLowerCase());
  // });
  let filterkey = Object.values(key)[0];
  items = items.filter(function(search) {
    return search[filterkey].toLowerCase().indexOf(searchTxt.toLowerCase()) > -1;
  });
  return items;
  }
  // for (let i = 0; i < properties.length; i++) {
  //   if (item[properties[i]].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
  //     itemFound = true;
  //     break;
  //   }
  // }
  // return itemFound;
}
