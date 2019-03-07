export interface User {
  userId: number;
  emailLogin: string;
  firstName: string;
  lastName: string;
  department: string;
  roles: Array<string>;
  active: boolean;
}
