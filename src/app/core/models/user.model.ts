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
