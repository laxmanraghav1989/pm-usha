import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {

  @HostListener("keypress", ["$event"]) onKeydown(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[0-9.&() /-]*$/.test(inp)) {
     return true;
   } else {
     event.preventDefault();
     return false;
   }
 }

}
