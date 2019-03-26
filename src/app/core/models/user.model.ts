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

export interface UserTimeMonthly {
  consultantdId: string;
  month: string;
  monthDays: Array<DayForManager>;
  projectId: string;
}

export interface DayForManager {
  data: string;
  hours: number;
  status: string;
  comment: string;
  test: string;
}
