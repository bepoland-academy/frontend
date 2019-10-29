import { TimeEntry, Day, TimeEntryWithoutProjectInfo } from '../../../core/models';

export const getDifferenceBetweenEntries = (
  entriesFromApi: Array<TimeEntry>,
  currentEntries: Array<TimeEntry>,
  status: string
) => {

  return currentEntries.map((project: TimeEntry) => {
    const { projectInfo, ...restProjectAttributes } = project;
    return {
      ...restProjectAttributes,
      weekDays: project.weekDays.map((day: Day, i: number) => {
        const projectFromCurrentEntry: TimeEntry = entriesFromApi.find(p => p.projectId === project.projectId);

        // if there is no defined timeentry on the BE
        if (!projectFromCurrentEntry) {
          return {
            ...day,
            status,
          };
        }
        const dayFromCurrentEntries: Day = projectFromCurrentEntry.weekDays.find(d => d.date === day.date);
        const areDaysHaveSameHours: boolean = dayFromCurrentEntries.hours === day.hours;
        return {
          ...day,
          hours: areDaysHaveSameHours ? dayFromCurrentEntries.hours : day.hours,
          status: areDaysHaveSameHours ? day.status : status,
        };
      }),
    };
  });
};


export const setStatusToTimeEntries = (
  timeEntries: TimeEntry[],
  status: string
): TimeEntryWithoutProjectInfo[] => timeEntries.map((project: TimeEntry) => {
  const { projectInfo, ...rest } = project;

  return {
    ...rest,
    weekDays: project.weekDays.map((day: Day) => {
      return {
        ...day,
        status,
      };
    }),
  };
});
