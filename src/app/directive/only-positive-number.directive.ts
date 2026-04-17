import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[onlyPositiveNumber]'
})
export class OnlyPositiveNumber {

    @HostListener('keypress', ['$event'])
    onKeypress(e: KeyboardEvent) {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8)) {
            return false;
        }
    }
}

 