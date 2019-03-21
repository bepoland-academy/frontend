export interface Department {
  departmentId: string;
  name: string;
}

export interface DepartmentsResponse {
  _embedded: {
    departmentBodyList: Array<Department>;
  };
}
