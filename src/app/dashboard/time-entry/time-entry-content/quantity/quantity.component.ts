import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Day } from '../../../../core/models';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css'],
})
export class QuantityComponent implements OnInit, AfterViewInit {
  @Input() inputValue: number;
  @Input() day: Day;
  @Output() inputValueChange: EventEmitter<number> = new EventEmitter();
  @ViewChild('quantity') quantityElelment: ElementRef;

  dayState: Day;

  constructor() {
    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  ngOnInit(): void {
    this.dayState = {...this.day};
  }

  ngAfterViewInit(): void {
    this.quantityElelment.nativeElement.addEventListener('wheel', this.onMouseWheel, {passive: false});
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
    event.preventDefault()
    if (event.deltaY < 0) {
      this.increaseValue();
    } else {
      this.decreaseValue();
    }
    return false;
  }

}
