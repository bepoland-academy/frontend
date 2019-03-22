import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-consultants-list',
  templateUrl: './consultants-list.component.html',
  styleUrls: ['./consultants-list.component.css'],
})
export class ConsultantsListComponent implements OnInit {

  @Output() consultantClick = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }

  askToHide() {
    this.consultantClick.emit();
  }

}
