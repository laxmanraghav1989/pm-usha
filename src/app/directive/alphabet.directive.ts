import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabet]'
})
export class AlphabetDirective {

  @HostListener("keypress", ["$event"]) onKeydown(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[a-zA-Z. ]+$/g.test(inp)) {
     return true;
   } else {
     event.preventDefault();
     return false;
   }
 }

}
