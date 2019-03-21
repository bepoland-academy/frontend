import { Client } from './client.model';
import { Department } from './department.model';


export interface Project {
  active: boolean;
  client: Client;
  comments: string;
  department: string;
  name: string;
  rate: number;
}

export interface ProjectsResponse {
  _embedded: {
    projectBodyList: Array<Project>;
  };
}

export interface ProjectsByClient {
  clientName: string;
  projects: Array<Project>;
}

export interface NewProject {
  name: string;
  client: Client['clientId'];
  department: Department['departmentId'];
  comments?: string;
  rate?: number;
}

