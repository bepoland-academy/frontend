import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';

import { TimeApprovalService } from '../time-approval.service';
import { MatDialog } from '@angular/material/dialog';
import { TimeApprovalDialog } from './time-approval-dialog/time-approval-dialog';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent as NgCalendar } from 'ng-fullcalendar';

const groupProjectsAndSumHours = (data) => {
  const counts = data.reduce((prev, curr) => {
    const count = prev.get(curr.date) || 0;
    prev.set(curr.date, curr.hours + count);
    return prev;
  }, new Map());
  let finalArray = [];
  counts.forEach((title, start) => {
    const {status, comment} = data.find(el => el.date === start);
    finalArray = [...finalArray, { title, start, status, comment}];
  });

  return finalArray;
};

// converting current data to calendar where start is equal to date and title to hours from day
const convertDataToCalendar = (projects) => {
  const getDayStatus = (date) => {
    const status = projects[0].monthDays.find(el => el.date === date).status;
    const colorForStatus = {
      APPROVED: 'green',
      REJECTED: 'red',
    };
    return colorForStatus[status] || '';
  };

  const projectsWithoutSavedStatus = projects
    .flatMap(project => project.monthDays)
    .filter(day => day.status !== 'SAVED');

  const groupedProjectsByDate = groupProjectsAndSumHours(projectsWithoutSavedStatus);

  return groupedProjectsByDate.map(entry => {
    return {
    ...entry,
      className: [getDayStatus(entry.start)],
      projects: projects.flatMap(project => ({
        day: project.monthDays.find(el => el.date === entry.start),
        project: project.projectInfo,
      })),
    };
  });
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
    public dialog: MatDialog
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
      this.eventsModel = convertDataToCalendar(user.monthTimeSheet);
    });

  }

  askToShow() {
    this.listClick.emit();
  }

  openDialog(model): void {
    const ojb = model.event.extendedProps.projects;
    this.dialog.open(TimeApprovalDialog, {
      data: { date: ojb[0].day.date, projects: ojb, currentUser: this.currentUser },
    });
  }

  eventClick(model) {
    this.openDialog(model);
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
