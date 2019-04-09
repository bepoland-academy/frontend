import { Links } from '.';

export interface User {
  active: boolean;
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<string>;
  userId: string;
  _links?: Links;
}

export interface UsersResponse {
  _embedded: {
    userBodyList: Array<User>
  };
}
