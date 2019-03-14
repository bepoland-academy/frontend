import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css'],
})
export class QuantityComponent implements OnInit {
  @Input() inputValue;
  @Input() isWeekend;
  @Output() inputValueChange = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  verifiedValue(newValue) {
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
}
