import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: "[appAlphaNumeric]"
})
export class AlphabetOnlyDirective {
 
  @HostListener("keypress", ["$event"]) onKeydown(event: KeyboardEvent) {
     var inp = String.fromCharCode(event.keyCode);
     if (/^[a-zA-Z0-9.&() /-]*$/g.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
