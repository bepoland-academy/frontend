export interface User {
active: boolean;
department: string;
email: string;
firstName: string;
lastName: string;
roles: Array<string>;
userId: string;
_links?: {
  self: {
    href: string;
  }
};
}

export interface UsersResponse {
  _embedded: {
    userBodyList: Array<User>
  };
}

export interface UserTimeMonthlyResponse {
  _embedded: {
    monthTimeEntryBodyList: Array<MonthTime>
  };
  firstName?: string;
  lastName?: string;
  overallStatus?: string;
}

export interface MonthTime {
  consultantId: string;
  month: string;
  monthDays: Array<DayTime>;
  projectId: string;
}

export interface DayTime {
  date: string;
  hours: number;
  status: string;
  comment: string;
}
