import { TestBed } from '@angular/core/testing';

import { AuthService, user, credentials } from './auth.service';
import { NavigationService } from '../dashboard/navigation/navigation.service';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';


const user:user = {
  userId: 1,
  active: true,
  department: 'bank',
  emailLogin: 'test@test.com',
  firstName: 'Testname',
  lastName: 'Testlastname',
  roles: ['testRole']
}

const credentials: credentials = {
  emailLogin: 'test@email.pl',
  password: 'qwe123!'
}

let navigationSpy;
let httpSpy;




fdescribe('AuthService', () => {
  let service: AuthService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  beforeEach(() => {
    navigationSpy = jasmine.createSpyObj({ filterRoutes() { }, })
    httpSpy = jasmine.createSpyObj('HttpService', ['post']).and.returnValue(new Observable())
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: NavigationService, useValue: navigationSpy },
        { provide: HttpService, useValue: httpSpy }
      ]
    });
    service = TestBed.get(AuthService)
    httpServiceSpy = TestBed.get(HttpService)
    navigationServiceSpy = TestBed.get(NavigationService)

    let store = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test', () => {
    httpServiceSpy.post.and.returnValue(Observable)
    service.login(credentials)
    
  });
  
  
});

