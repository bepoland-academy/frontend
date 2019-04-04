import { Project } from './project.model';
import { Day } from './day.model';
import { Links } from './links.model';

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
  _links: Links;
}
export interface TimeEntriesWithLinks {
  timeEntries: Array<TimeEntry>;
  _links: Links;
}

export interface TimeEntriesWithLinksAndProjects extends TimeEntriesWithLinks {
  projectList: Array<Project>;
}
