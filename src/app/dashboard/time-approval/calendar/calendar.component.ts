import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';

import { TimeApprovalService } from '../time-approval.service';
import { MatDialog } from '@angular/material';
import { TimeApprovalDialog } from './time-approval-dialog/time-approval-dialog';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent as NgCalendar } from 'ng-fullcalendar';

const aa = (data) => {

  const tmp = {};
  const a = data.map(function(item) {
    const tempKey = item.date;
    if (!tmp.hasOwnProperty(tempKey)) {
     return  tmp[tempKey] = item;
    } else {
      tmp[tempKey].hours += item.hours;
      return;
    }
  }).filter(Boolean);
  console.log(a);
  // const results = Object.keys(tmp).map(function(key) {
  //   return tmp[key];
  // });
  return a.map(item => ({
    title:  item.hours,
    start: item.date,
  }));
};

const convertDataToCalendar = (projects) => {
  const projectsWithoutSavedStatus = projects.flatMap(project => project.monthDays)
    .filter(day => day.status !== 'SAVED');

  const groupedProjects = aa(projectsWithoutSavedStatus);

  const getDayStatus = (date) => {
    const status = projects[0].monthDays.find(el => el.date === date).status;

    if (status === 'APPROVED') {
      return 'green';
    }
    if (status === 'REJECTED') {
      return 'red';
    }
    return '';
  };


  return groupedProjects.map(entry => {
    return {
    ...entry,

      className: [getDayStatus(entry.start)],
    projects: projects.flatMap(project => ({
      day: project.monthDays.find(el => el.date === entry.start),
      project: project.projectInfo,
    })),
  }; });

};
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  currentUser: any;
  @Input() toggleButtonVisible: boolean;
  @Output() listClick = new EventEmitter<null>();
  @Input() usersTime;
  @ViewChild('fullcalendar') fullcalendar: NgCalendar;
  options: OptionsInput;
  eventsModel: any;

  constructor(
    private timeApprovalService: TimeApprovalService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) {
  }
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
      // events: convertDataToCalendar(this.currentUser.monthTimeSheet),
    };
    this.timeApprovalService.getReloadStatus().subscribe((user: any) => {
      if (this.fullcalendar) {
        this.fullcalendar.calendar.removeAllEvents();
      }
      this.currentUser = user;
      console.log(this.currentUser);
      this.eventsModel = convertDataToCalendar(user.monthTimeSheet);
    });

  }

  askToShow() {
    this.listClick.emit();
  }

  openDialog(model): void {
    const dialogRef = this.dialog.open(TimeApprovalDialog, {
      // width: '250px',
      // height: '250px',
      data: { date: model.event.extendedProps.projects[0].day.date, projects: model.event.extendedProps.projects, currentUser: this.currentUser },
    });
  }
  eventClick(model) {
    this.openDialog(model);
  }
  eventDragStop(model) {
  }
  clickButton(model) {
  }
  dateClick(model) {
  }
  aproveAll() {
    const dataToSend = this.currentUser.monthTimeSheet.map(timeSheet => {
      const { projectInfo, ...rest } = timeSheet;
      return {
        ...rest,
        monthDays: rest.monthDays.map(item => item.status === 'SUBMITTED' ? { ...item, status: 'APPROVED' } : item),
      };
    });
    const userWithModifiedTimeSheet = {
      ...this.currentUser,
      monthTimeSheet: this.currentUser.monthTimeSheet.map(timeSheet => ({ ...timeSheet, monthDays: timeSheet.monthDays.map(item => item.status === 'SUBMITTED' ? { ...item, status: 'APPROVED' } : item) })),
    };
    this.timeApprovalService.reloadCalendar(userWithModifiedTimeSheet);
    // this.timeApprovalService.updateTimeSheet(this.currentUser._links.self.href, { monthTimeEntryBodyList: dataToSend}).subscribe(() => console.log('oposzlo'));
  }

  // ngOnDestroy(): void {
  //   // Called once, before the instance is destroyed.
  //   // Add 'implements OnDestroy' to the class.
  //   console.log('object');
  // }
}
