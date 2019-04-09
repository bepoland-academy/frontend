import { Day, User, Project, Links } from '.';

export interface MonthTimeEntryWithoutProjectInfo {
  consultantId: string;
  projectId: string;
  month: string;
  monthDays: Array<Day>;
}

export interface MonthTimeEntry extends MonthTimeEntryWithoutProjectInfo {
  projectInfo: Project;
}

export interface MonthTimeEntryResponse {
  _embedded: {
    monthTimeEntryBodyList: Array<MonthTimeEntryWithoutProjectInfo>
  };
  _links?: Links;
}


export interface UserWithTimeSheetWithoutSubbmitedHours extends User {
  monthTimeSheet: Array<MonthTimeEntry>;
}

export interface UserWithTimeSheet extends UserWithTimeSheetWithoutSubbmitedHours {
  submittedHours: number;
}

