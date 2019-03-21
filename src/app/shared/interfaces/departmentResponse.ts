import { Department } from '../../core/models';

export interface DepartmentResponse {
  _embedded: {
    departmentBodyList: Array<Department>;
  };
}
