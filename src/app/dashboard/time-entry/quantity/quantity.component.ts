import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css'],
})
export class QuantityComponent implements OnInit {
  @Input() inputValue;
  @Output() inputValueChange = new EventEmitter();

  @Input() day;

  constructor() {}

  ngOnInit() {
    console.log(this.day)
  }

  verifiedValue(newValue) {
    this.inputValue = newValue;
    this.inputValueChange.emit(newValue);
  }

  increaseValue() {
    if (this.day.status === 'submitted') {
      return;
    }
    if (+this.inputValue > 0 && +this.inputValue < 24 || +this.inputValue === 0) {
      this.verifiedValue(+this.inputValue + 0.5);
    }
  }
  decreaseValue() {
    if (this.day.status === 'submitted') {
      return;
    }
    if (+this.inputValue > 0 && +this.inputValue < 24 || +this.inputValue === 24) {
      this.verifiedValue(+this.inputValue - 0.5);
    }
  }

  onMouseWheel(event) {
    if (this.day.status === 'submitted') {
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
