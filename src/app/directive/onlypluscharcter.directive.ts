import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlypluscharcter]'
})
export class OnlypluscharcterDirective {

  private regex: RegExp = new RegExp(/^[a-zA-Z+]+$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const inputValue: string = this.el.nativeElement.value.concat(event.key);
    if (!String(inputValue).match(this.regex)) {
      event.preventDefault();
    }
  }
}