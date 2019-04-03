import { Client } from './client.model';


export interface Project {
  active: boolean;
  client: Client;
  comments: string;
  department: string;
  name: string;
  rate: number;
  projectId: string;
  removable?: boolean;
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

