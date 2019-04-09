import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Day } from 'src/app/core/models';

@Directive({
  selector: '[appWeekend]',
})
export class DayDirective implements AfterViewInit {
  element: HTMLElement;
  sum: number;
  @Input() day: Day;
  constructor(el: ElementRef) {
    this.element = el.nativeElement;

  }
  ngAfterViewInit() {
    this.weekend();
  }

  weekend() {
    if (this.day && this.day.day === 'SATURDAY' || this.day && this.day.day === 'SUNDAY') {
      this.element.style.backgroundColor = 'rgba(245, 245, 245,0.7)';
      this.element.style.color = 'rgba(0,0,0,.87)';
    }
  }
}
