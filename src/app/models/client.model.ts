export interface Client {
  clientName: string;
  projects: Array<Project>;
}

export interface Project {
  projectName: string;
  weekDays: Array<WeekDays>;
}

export interface WeekDays {
  day: string;
  date: string;

}
