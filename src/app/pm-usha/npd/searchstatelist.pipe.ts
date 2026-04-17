import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchstatelist'
})
export class SearchstatelistPipe implements PipeTransform {


  public transform(value: any[], filterText: string) {

    return filterText ? value.filter(x=> x.name.toLowerCase().includes(filterText.toLowerCase())): value
  }

}
