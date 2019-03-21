import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appWeekend]',
})
export class WeekendDirective implements AfterViewInit {
  element: HTMLElement;
  @Input() day: string;
  constructor(el: ElementRef) {
    this.element = el.nativeElement;

  }
  ngAfterViewInit() {
    if (this.day === 'saturday' || this.day === 'sunday') {
      this.element.style.background = 'rgba(245, 245, 245,0.9)';
      this.element.style.color = 'rgba(0,0,0,.87)';

      const input: HTMLInputElement = this.element.querySelector('.quantity__input');
      if (input) {
        input.style.background = 'rgba(245, 245, 245,0.9)';
      }
    }
  }
}
