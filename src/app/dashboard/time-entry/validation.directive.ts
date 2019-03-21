import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appTimeEntry]',
})
export class ValidationDirective {
  private element: HTMLInputElement;
  @Output() checkedValue = new EventEmitter();
  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
  }

  @HostListener('input') oninput() {
    const mainRegExp = new RegExp(
      /^(?:([0-9]|1[0-9]|2[0-3])((\.|\,)|(?:(\.|\,)[0,5]))?|24)$/,
      'g'
    );
    const value = this.element.value;
    if (mainRegExp.test(value)) {
      this.element.value = value;
    } else {
      const regExpForFixingNumber = new RegExp(/^(?:([0-9]|1[0-9]|2[0-3])((\.|\,)|(?:(\.|\,)[0-9])))$/, 'g');
      if (regExpForFixingNumber.test(value)) {
        this.element.value = `${value.substring(0, value.length - 1)}5`;
      } else if (+value > 24) {
        this.element.value = '24';
      } else {
        this.element.value = '';
      }
    }
    this.checkedValue.emit(this.element.value.trim());
  }
}
