import { Directive, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import { TimeEntry, Day } from '../../../core/models';

@Directive({
  selector: '[appFooter]',
})
export class FooterDirective {
  element: HTMLElement;
  sum: number;
  @Input() day: Day;
  @Input() allEntries: Array<TimeEntry>;
  constructor(el: ElementRef) {
    this.element = el.nativeElement;

  }

  ngDoCheck(): void {
    this.sumHoursFromSelectedDay();
  }
  sumHoursFromSelectedDay() {
    const tooltipElement = this.element.querySelector('.tooltip');
    tooltipElement.classList.remove('visible');
    const sum = this.allEntries.map((timeEntry: TimeEntry) =>
      timeEntry.weekDays.map((weekDay: Day) =>
        weekDay.day === this.day.day ? weekDay.hours : 0
      ).reduce((sum: number, val: number) => sum + val)
    ).reduce((allDaySum: number, val: number) => allDaySum + val);
    if (+sum > 24) {
      tooltipElement.classList.add('visible');
    }
    this.element.querySelector('.sum').textContent = sum.toString();
  }
}
