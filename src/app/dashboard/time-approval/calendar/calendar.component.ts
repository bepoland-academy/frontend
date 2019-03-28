import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { TimeApprovalService } from '../time-approval.service';
import { MatDialog } from '@angular/material';
import { TimeApprovalDialog } from './time-approval-dialog/time-approval-dialog';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent as NgCalendar } from 'ng-fullcalendar';


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
  @Input() currentUser: any;
  @Output() listClick = new EventEmitter<null>();
  @ViewChild('fullcalendar') fullcalendar: NgCalendar;
  options: OptionsInput;
  eventsModel: any;

  constructor(
    private timeApprovalService: TimeApprovalService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.options = {
      firstDay: 1,
      editable: true,
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      plugins: [dayGridPlugin, interactionPlugin],
      weekNumbers: true,
      allDayDefault: true,
    };
  }

  askToShow() {
    this.listClick.emit();
  }

  openDialog(model): void {
    const dialogRef = this.dialog.open(TimeApprovalDialog, {
      // width: '250px',
      // height: '250px',
      data: {date: model.event.extendedProps.projects[0].day.date, projects: model.event.extendedProps.projects },
    });
  }
  eventClick(model) {
    this.openDialog(model);
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
  ngOnChanges(): void {
    if (this.currentUser) {
      this.options.events = convertDataToCalendar(this.currentUser.monthTimeSheet);
    }
  }

}
