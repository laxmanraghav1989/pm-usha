import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllownumberanddecimal]'
})
export class AllownumberanddecimalDirective {
  @HostListener("keypress", ["$event"]) onKeydown(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^\d*\.?\d*$/.test(inp)) {
     return true;
   } else {
     event.preventDefault();
     return false;
   }
 }
}
