// import { Directive, HostListener } from '@angular/core';

// @Directive({
//   selector: '[appOnlyNumeric]'
// })
// export class OnlyNumericDirective {

//   @HostListener("keypress", ["$event"]) onKeypress(event: KeyboardEvent) {
//     return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;

//   }

// }

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumeric]'
})
export class OnlyNumericDirective {

  @HostListener("keypress", ["$event"]) onKeypress(event: KeyboardEvent) {
    // Allow backspace (charCode 8), null (charCode 0), digits (charCode 48-57), and period (charCode 46)
    if (event.charCode == 8 || event.charCode == 0 || event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}

