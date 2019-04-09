import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserWithTimeSheet } from 'src/app/core/models';

@Component({
  selector: 'app-consultants-list',
  templateUrl: './consultants-list.component.html',
  styleUrls: ['./consultants-list.component.css'],
})

export class ConsultantsListComponent implements OnInit {

  @Input() usersTime: Array<UserWithTimeSheet>;
  @Output() setCurrentUser: EventEmitter<UserWithTimeSheet> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  handleClick(user: UserWithTimeSheet) {
    this.setCurrentUser.emit(user);
  }
}
