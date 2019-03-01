import { TestBed } from '@angular/core/testing';

import { AuthService, user, credentials } from './auth.service';
import { NavigationService } from '../dashboard/navigation/navigation.service';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

const navigationServiceMock: NavigationService = jasmine.createSpyObj({ filterRoutes() {},})
const httpServiceMock: HttpService = jasmine.createSpyObj({post() {new Observable()}})
const user:user = {
  userId: 1,
  active: true,
  department: 'bank',
  emailLogin: 'test@test.com',
  firstName: 'Testname',
  lastName: 'Testlastname',
  roles: ['testRole']
}




describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {TestBed.configureTestingModule({
    providers: [
      AuthService,
      { provide: NavigationService, useValue: navigationServiceMock },
      { provide: HttpService, useValue: httpServiceMock }
    ]
  });
  service = TestBed.get(AuthService)
  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test', () => {
    //const credentials = 
    //service.login()
  });
  
  
});

