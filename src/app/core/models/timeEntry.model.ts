import { Project } from './project.model';
import { Day } from './day.model';

export interface TimeEntry {
  projectId: string;
  week: string;
  weekDays: Array<Day>;
  projectInfo: Project;
}

export interface TimeEntryResponse {
  _embedded: {
    weekTimeEntryBodyList: Array<TimeEntry>
  };
  _links: string;
}
