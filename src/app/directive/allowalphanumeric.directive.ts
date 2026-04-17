import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowalphanumeric]'
})
export class AllowalphanumericDirective {
  @HostListener("keypress", ["$event"]) onKeydown(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[a-zA-Z0-9.&() /-]*$/.test(inp)) {
     return true;
   } else {
     event.preventDefault();
     return false;
   }
 }
}
