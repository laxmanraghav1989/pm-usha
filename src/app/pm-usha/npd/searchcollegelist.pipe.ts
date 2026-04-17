import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchcollegelist'
})
export class SearchcollegelistPipe implements PipeTransform {


  public transform(value: any[], filterText: string) {

    return filterText ? value.filter(x=> x.name.toLowerCase().includes(filterText.toLowerCase())): value
  }

}
