import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';

import { MatDialog } from '@angular/material';
import { TimeApprovalDialog } from './time-approval-dialog/time-approval-dialog';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent as NgCalendar } from 'ng-fullcalendar';
import * as moment from 'moment';
import { HttpService } from 'src/app/core/services/http.service';
import { map } from 'rxjs/operators';
import {
  UserWithTimeSheet,
  Project,
  MonthTimeEntry,
  MonthTimeEntryResponse,
  Links,
  MonthTimeEntryWithoutProjectInfo
} from 'src/app/core/models';
import { EventsModel, convertDataToCalendar } from './convertDataToCalendar';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnChanges {
  @ViewChild('fullcalendar') fullcalendar: NgCalendar;
  @Input() currentUser: UserWithTimeSheet;
  @Input() toggleButtonVisible: boolean;
  @Input() isTimeApproval: boolean;
  @Output() listClick: EventEmitter<null> = new EventEmitter();
  @Output() approveAll: EventEmitter<null> = new EventEmitter();
  @Output() setStatusForOneDay: EventEmitter<{status: string; date: string, comment?: string}> = new EventEmitter();
  @Output() nextApproval: EventEmitter<string> = new EventEmitter();
  currentDate = new Date();

  isLoading = false;
  options: OptionsInput;
  eventsModel: Array<EventsModel>;

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService
  ) {
  }

  ngOnInit() {
    this.options = {
      firstDay: 1,
      editable: true,
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: '',
      },
      plugins: [dayGridPlugin, interactionPlugin],
      weekNumbers: true,
      allDayDefault: true,
    };
    this.eventsModel = convertDataToCalendar(this.currentUser.monthTimeSheet);
  }

  ngOnChanges(): void {
    // clearing all events from calendar and then convert from new user
    this.updateViewCalendar();
  }

  askToShow() {
    this.listClick.emit();
  }

  updateViewCalendar() {
    if (this.fullcalendar) {
      this.fullcalendar.calendar.gotoDate(this.currentDate);
      this.fullcalendar.calendar.removeAllEvents();
      this.eventsModel = convertDataToCalendar(this.currentUser.monthTimeSheet);
    }
  }

  eventClick(model) {
    const projects = model.event.extendedProps.projects;
    const { isTimeApproval } = this;
    const dialog = this.dialog.open(TimeApprovalDialog, {
      data: { projects, isTimeApproval},
    });
    dialog.afterClosed().subscribe((val: undefined | {comment: string}) => {
      if (!val) {
        return;
      }

      if (val.comment) {
        this.setStatusForOneDay.emit({ status: 'REJECTED', date: projects[0].day.date, comment: val.comment });
        return;
      }

      this.setStatusForOneDay.emit({ status: 'APPROVED', date: projects[0].day.date });
    });
  }

  showAnotherMonth(event) {
    let link = this.cutCurrentLink();
    this.currentDate = event.data;
    // get current date from event
    const date = moment(event.data);
    let month: number | string = date.month() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    this.updateViewCalendar();
    // update link with current month
    link = `${link}${date.year()}-${month}`;
    this.fetchUserInfo(link);
  }
  approveAllHandler() {
    this.approveAll.emit();
  }

  fetchUserInfo(link: string) {
    console.log(link);
    this.isLoading = true;
    this.httpService.fakeGet(link)
      .pipe(
        map((userTimeSheetResponse: MonthTimeEntryResponse) => {
          const projects = this.httpService.getProjectsStream().value;
          let _links: Links = {
            self: {
              href: link,
            },
          };
          let monthTimeSheet: MonthTimeEntry[] = [];

          // if there is response transfrom from embeded and get all infos and links and add to every project
          // projectInfo property
          if (userTimeSheetResponse._embedded) {
            _links = userTimeSheetResponse._links;
            monthTimeSheet = userTimeSheetResponse._embedded.monthTimeEntryBodyList
              .map((timeSheet: MonthTimeEntryWithoutProjectInfo) => (
                {
                  ...timeSheet,
                  projectInfo: projects.find((o: Project) => o.projectId === timeSheet.projectId),
                }
              ));
          }

          // otherwise set default values where there is no response
          return {
            ...this.currentUser,
            monthTimeSheet,
            _links,
          };
        }),
        map((usersWithTimeSheets) => {
          return {
            ...usersWithTimeSheets,
            submittedHours: usersWithTimeSheets.monthTimeSheet
              .flatMap(projectTimeSheet =>
                projectTimeSheet.monthDays.map(day =>
                  day.status === 'SUBMITTED' ? day.hours : 0).reduce((sum, val) => sum + val, 0)
              )
              .reduce((sum, val) => sum + val, 0),
          };
        })
      )
      .subscribe((userWithTimesheet: UserWithTimeSheet) => {
        this.isLoading = false;
        this.currentUser = userWithTimesheet;
        this.updateViewCalendar();
      });

  }

  nextApprovalHandler() {
    const link = this.cutCurrentLink();
    this.nextApproval.emit(link);
  }

  cutCurrentLink() {
    let link = this.currentUser._links.self.href;
    // remove year and month from link
    link = link.substring(0, link.length - 7);
    return link;
  }
}