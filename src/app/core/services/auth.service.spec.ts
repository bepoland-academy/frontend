import { TestBed, async } from '@angular/core/testing';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { NavigationService } from './navigation.service';
import { of } from 'rxjs';
import { HttpService } from './http.service';
import { Credentials, User } from '../models/index';


const user: User = {
  userId: '1',
  active: true,
  department: 'bank',
  email: 'test@test.com',
  firstName: 'Testname',
  lastName: 'Testlastname',
  roles: ['testRole'],
};

const credentials: Credentials = {
  username: 'test@email.pl',
  password: 'qwe123!',
};

let navigationSpy;
let httpSpy;

describe('AuthService', () => {
  let service: AuthService;
  let httpService: HttpService;
  let navigationService: NavigationService;
  let localStorageMock = {};
  beforeEach(async(() => {
    navigationSpy = jasmine.createSpyObj('NavigationService', {
      filterRoutes() { },
    });
    httpSpy = jasmine.createSpyObj('HttpService', {
      login: of(new HttpResponse({
        body: user,
        headers: new HttpHeaders().set('Authorization', 'key'),
      })),
      fetchProjects() {},
    });
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: NavigationService, useValue: navigationSpy },
        { provide: HttpService, useValue: httpSpy },
      ],
    });


    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return localStorageMock[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete localStorageMock[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return localStorageMock[key] = value as string;
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      localStorageMock = {};
    });
  }));
  beforeEach(() => {
    service = TestBed.get(AuthService);
    httpService = TestBed.get(HttpService);
    navigationService = TestBed.get(NavigationService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calling login method', () => {
    console.log(navigationService);
    service.login(credentials).subscribe(
      (mockedUser: any) => {
        console.log(mockedUser);
        expect(mockedUser.body).toBe(user);
        expect(service.loggedIn.getValue()).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalled();
        expect(navigationService.filterRoutes).toHaveBeenCalledWith(user.roles);
      }
    );
    expect(httpService.login).toHaveBeenCalledWith('auth/login', credentials, { observe: 'response' as 'body' });
  });

  it('should get user from localStorage ', () => {
    localStorage.setItem('user', JSON.stringify(user));
    service.getUser();
    expect(navigationService.filterRoutes).toHaveBeenCalledWith(user.roles);
    expect(service.loggedIn.getValue()).toBeTruthy();
  });

  it('calling logout method', () => {
    service.logout();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(service.loggedIn.getValue()).toBeFalsy();
  });

});

