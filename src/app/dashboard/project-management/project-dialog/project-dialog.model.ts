import { Client, Role, User } from 'src/app/core/models';


export interface UserName {
  name: string;
}

export interface CreateProjectDialogData {
  clients: Array<Client>;
  department: string;
  roles: Array<Role>;
  usersByDepartment: Array<User & UserName>;
}

export interface ProjectRole {
  role: Role;
  rate: number;
  onSiteRate: number;
}
