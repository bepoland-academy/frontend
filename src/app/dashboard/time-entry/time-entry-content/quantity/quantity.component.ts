import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Day } from '../../../../core/models';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css'],
})
export class QuantityComponent implements OnInit {
  @Input() inputValue: number;
  @Output() inputValueChange: EventEmitter<number> = new EventEmitter();

  @Input() day: Day;

  constructor() {}

  ngOnInit() {
  }

  verifiedValue(newValue: number) {
    this.inputValue = newValue;
    this.inputValueChange.emit(newValue);
  }

  increaseValue() {
    if (this.day.status === 'SUBMITTED') {
      return;
    }
    if (+this.inputValue > 0 && +this.inputValue < 24 || +this.inputValue === 0) {
      this.verifiedValue(+this.inputValue + 0.5);
    }
  }
  decreaseValue() {
    if (this.day.status === 'SUBMITTED') {
      return;
    }
    if (+this.inputValue > 0 && +this.inputValue < 24 || +this.inputValue === 24) {
      this.verifiedValue(+this.inputValue - 0.5);
    }
  }

  onMouseWheel(event: WheelEvent) {
    if (this.day.status === 'SUBMITTED') {
      return;
    }
    if (event.deltaY < 0) {
      this.increaseValue();
    } else {
      this.decreaseValue();
    }
    return false;
  }
}
