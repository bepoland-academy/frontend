export interface ProjectsResponse {
  _embedded: {
    projectBodyList: Array<Project>;
  };
}

export interface ProjectsByClient {
  clientName: string;
  projects: Array<Project>;
}

export interface Project {
  active: boolean;
  client: {
    clientId: string;
    name: string;
  };
  clientGuid: string;
  comments: string;
  departmentGuid: string;
  name: string;
  offSiteOnly: boolean;
  projectId: string;
  rates: Array<Rate>;
  _links?: {
    DELETE: {
      href: string;
    },
    self: {
      href: string;
    }
  };
}

export interface Rate {
  consultants: Array<string>;
  onSiteRate: number;
  rate: number;
  roleId: string;
}



