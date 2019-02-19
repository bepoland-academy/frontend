import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-tracking',
  template: `
    <p>
      time-tracking works!
    </p>
  `,
  styles: []
})
export class TimeTrackingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(';montuje mnie');
  }

}
