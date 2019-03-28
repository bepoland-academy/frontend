export interface Client {
  clientId: string;
  name: string;
}

export interface ClientsResponse {
  _embedded: {
    clientBodyList: Array<Client>
  };
}
