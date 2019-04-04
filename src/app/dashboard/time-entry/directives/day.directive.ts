import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appWeekend]',
})
export class DayDirective implements AfterViewInit {
  element: HTMLElement;
  sum: number;
  @Input() day;
  constructor(el: ElementRef) {
    this.element = el.nativeElement;

  }
  ngAfterViewInit() {
    this.isWeekend();
  }

  isWeekend() {
    if (this.day.day === 'saturday' || this.day.day === 'sunday') {
      this.element.style.background = 'rgba(245, 245, 245,0.6)';
      this.element.style.color = 'rgba(0,0,0,.87)';
    }
  }
}
