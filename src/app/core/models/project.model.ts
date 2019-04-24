import { Client } from './client.model';


export interface Project {
  active: boolean;
  client: Client;
  clientGuid: string
  comments: string;
  departmentGuid: string;
  name: string;
  rate: number;
  rates: Array<any>;
  projectId: string;
  removable?: boolean;
  _links?: {
    DELETE: {
      href: string;
    },
    self: {
      href: string;
    }
  };
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

