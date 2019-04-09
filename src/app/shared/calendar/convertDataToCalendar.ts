import { Day, Project, MonthTimeEntry } from 'src/app/core/models';

interface DayWithHours {
  title: number;
  start: string;
  status: string;
  comment: string;
}

interface ExtendedProps {
  day: Day;
  project: Project;
}

export interface EventsModel extends DayWithHours {
  className: Array<string>;
  projects: Array<ExtendedProps>;
}

export const groupProjectsAndSumHours = (data: Array<Day>): Array<DayWithHours> => {
  const counts: Map<string, number> = data.reduce((prev: Map<string, number>, curr: Day) => {
    const count = prev.get(curr.date) || 0;
    prev.set(curr.date, curr.hours + count);
    return prev;
  }, new Map());

  let finalArray: Array<DayWithHours> = [];
  counts.forEach((title: number, start: string) => {
    const { status, comment } = data.find((el: Day) => el.date === start);
    finalArray = [...finalArray, { title, start, status, comment }];
  });
  return finalArray;
};

// converting current data to calendar where start is equal to date and title to hours from day
export const convertDataToCalendar = (projects: Array<MonthTimeEntry>): Array<EventsModel> => {

  const getDayStatus = (date: string): string => {
    const status: string = projects[0].monthDays.find(el => el.date === date).status;
    const colorForStatus = {
      APPROVED: 'APPROVED',
      REJECTED: 'REJECTED',
      SUBMITTED: 'SUBMITTED',
    };
    return colorForStatus[status] || '';
  };

  const projectsWithoutSavedStatus: Array<Day> = projects
    .flatMap((project: MonthTimeEntry) => project.monthDays)
    .filter((day: Day) => day.status !== 'SAVED');

  const groupedProjectsByDate: Array<DayWithHours> = groupProjectsAndSumHours(projectsWithoutSavedStatus);

  return groupedProjectsByDate
    .map(entry => {
      return {
        ...entry,
        className: [getDayStatus(entry.start)],
        projects: projects
          .flatMap(project => ({
            day: project.monthDays.find(el => el.date === entry.start),
            project: project.projectInfo,
          }))
          .filter(project => project.day),
      };
    });
};

