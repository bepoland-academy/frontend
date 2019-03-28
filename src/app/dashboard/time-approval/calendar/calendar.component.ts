import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { TimeApprovalService } from '../time-approval.service';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent as NgCalendar } from 'ng-fullcalendar';
import { MatDialog } from '@angular/material';
import { TimeApprovalDialog } from './time-approval-dialog/time-approval-dialog';


const convertDataToCalendar = (projects) => {
  const dateWithHours = projects
    .flatMap(project => project.monthDays)
    .map((el, i, currentArr) => ({
      title: currentArr.filter(date => date.date === el.date).reduce((sum, val) => sum + val.hours, 0),
      start: el.date,
    }))
    .filter((el, index, currentArr) => index === currentArr.findIndex((t) => t.title === el.title && t.hours === el.hours));
  return dateWithHours.map(entry => ({
    ...entry,
    projects: projects.flatMap(project => ({
      day: project.monthDays.find(el => el.date === entry.start),
      project: project.projectInfo,
    })),
  }));
};
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  @Input() toggleButtonVisible: boolean;
  @Input() currentUser: string;
  @Output() listClick = new EventEmitter<null>();
  @ViewChild('fullcalendar') fullcalendar: NgCalendar;
  options: OptionsInput;
  eventsModel: any;
  projects = [
    {
      projectId: '1111',
      projectInfo: {name: 'Jakis name'},
      consultantId: '13',
      month: '2019-03',
      monthDays: [
        {
          date: '2019-03-01',
          hours: 9,
          status: 'SAVED',
          comment: '',
        },
        {
          date: '2019-03-02',
          hours: 9,
          status: 'SAVED',
          comment: '',
        },
      ],
  },
    {
      projectId: '222',
      consultantId: '13',
      projectInfo: { name: 'Another name' },
      month: '2019-03',
      monthDays: [
        {
          date: '2019-03-01',
          hours: 5,
          status: 'SUBMITTED',
          comment: '',
        },
        {
          date: '2019-03-02',
          hours: 9,
          status: 'SAVED',
          comment: '',
        },
      ],
    },
];
  constructor(
    private timeApprovalService: TimeApprovalService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.options = {
      firstDay:   1,
      editable: true,
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      plugins: [dayGridPlugin, interactionPlugin],
      weekNumbers: true,
      events: convertDataToCalendar(this.projects),
      allDayDefault: true,
    };
    this.openDialog();
  }

  askToShow() {
    this.listClick.emit();
  }

  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  clickButton(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model, 'asd');
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TimeApprovalDialog, {
      width: '250px',
      height: '250px',
      data: {},
    });
  }

}
