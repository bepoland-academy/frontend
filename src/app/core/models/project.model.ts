import { Client } from './client.model';
import { Rate } from './rate.model';

export interface ProjectWithoutClient {
  active: boolean;
  clientGuid: string;
  comments: string;
  departmentGuid: string;
  name: string;
  rates: Array<Rate>;
  projectId: string;
  _links: {
    DELETE: {
      href: string;
    },
    self: {
      href: string;
    }
  };
}

export interface Project extends ProjectWithoutClient {
  client: Client;
}


export interface ProjectsResponse {
  _embedded: {
    projectBodyList: Array<ProjectWithoutClient>;
  };
}

export interface ProjectsByClient {
  clientName: string;
  projects: Array<Project>;
}

