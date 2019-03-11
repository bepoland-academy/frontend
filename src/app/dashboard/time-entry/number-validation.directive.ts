import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTimeEntry]',
})
export class NumberValidationDirective {
  private element: HTMLInputElement;
  a;
  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
    this.a = el;
  }

  @HostListener('input') oninput() {
    const regExp = new RegExp(
      /^(?:([0-9]|1[0-9]|2[0-3])((\.|\,)|(?:(\.|\,)[0,5]))?|24)$/,
      'g'
    );
    const value = this.element.value;
    console.log(value);
    if (regExp.test(value)) {
      this.element.value = value;
    } else {
      if (+value > 24) {
        this.element.valueAsNumber = 24;
      } else if (+value < 0) {
        this.element.valueAsNumber = 0;
      }
    }
  }


}
