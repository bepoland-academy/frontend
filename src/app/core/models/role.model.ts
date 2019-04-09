export interface RolesResponse {
  _embedded: {
    roleBodyList: Array<Role>
  };
}

export interface Role {
  name: string;
  roleId: string;
  _links?: {
    self: {
      href: string;
    }
  };
}

