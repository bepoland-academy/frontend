import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-consultants-list',
  templateUrl: './consultants-list.component.html',
  styleUrls: ['./consultants-list.component.css'],
})

export class ConsultantsListComponent implements OnInit {

  @Input() usersTime: any;
  @Output() consultantClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  handleClick(event) {
    this.consultantClick.emit({ event });
    console.log(event);
  }

}
