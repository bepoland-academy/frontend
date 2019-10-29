import { Project } from './project.model';
import { Day } from './day.model';
import { Links } from './links.model';

export interface TimeEntryWithoutProjectInfo {
  projectId: string;
  week: string;
  weekDays: Array<Day>;
  offSite: boolean;
  _links?: {
    DELETE: {
      href: string;
    }
  };
}

export interface TimeEntry extends TimeEntryWithoutProjectInfo {
  projectInfo: Project;
}

export interface TimeEntryResponse {
  _embedded: {
    weekTimeEntryBodyList: Array<TimeEntryWithoutProjectInfo>
  };
  _links: Links;
}
export interface TimeEntriesWithLinks {
  timeEntries: Array<TimeEntryWithoutProjectInfo>;
  _links: Links;
}

export interface TimeEntriesWithLinksAndProjects extends TimeEntriesWithLinks {
  projectList: Array<Project>;
}
