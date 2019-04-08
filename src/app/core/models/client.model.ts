export interface Client {
  clientId: string;
  name: string;
  _links?: {
    self: {
      href: string;
    }
  };
}

export interface ClientsResponse {
  _embedded: {
    clientBodyList: Array<Client>
  };
}
