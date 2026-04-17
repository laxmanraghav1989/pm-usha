
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupeesFormat'
})
export class RupeesFormatPipe implements PipeTransform {

  transform(value: number | string, currencyCode: string = 'INR', display: string | boolean = 'symbol', digitsInfo: string = '1.2-2'): string | null {
    if (value === null || value === undefined) return null;

    // Convert value to number if it's in scientific notation or a string
    let numericValue = typeof value === 'number' ? value : Number(value);

    if (isNaN(numericValue)) return null; // Check if conversion failed
    let formattedNumber:any;
      // Check if the number is an integer or a float
  if (Number.isInteger(numericValue)) {
     formattedNumber = new Intl.NumberFormat('en-IN', {
      // style: 'currency',
      currency: 'INR',
     // minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericValue);

  } else {
    formattedNumber = new Intl.NumberFormat('en-IN', {
      // style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericValue);
  }
    //alert(`${numericValue}`);
 
    return formattedNumber;
  }

}
