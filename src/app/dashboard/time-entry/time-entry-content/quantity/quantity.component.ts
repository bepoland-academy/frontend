import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

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

  dayState: Day;

  constructor() {}

  ngOnInit(): void {
    this.dayState = {...this.day};

  }

  verifiedValue(newValue: number) {
    this.inputValue = newValue;
    this.inputValueChange.emit(newValue);
  }

  increaseValue() {
    if (+this.inputValue > 0 && +this.inputValue < 24 || +this.inputValue === 0) {
      this.verifiedValue(+this.inputValue + 0.5);
    }
  }
  decreaseValue() {
    if (+this.inputValue > 0 && +this.inputValue < 24 || +this.inputValue === 24) {
      this.verifiedValue(+this.inputValue - 0.5);
    }
  }

  onMouseWheel(event: WheelEvent) {
    if (event.deltaY < 0) {
      this.increaseValue();
    } else {
      this.decreaseValue();
    }
    return false;
  }
}
