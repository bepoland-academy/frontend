export interface User {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  department: string;
  roles: Array<string>;
  active: boolean;
}
