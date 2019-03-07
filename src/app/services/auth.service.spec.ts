import { TestBed, async } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { NavigationService } from '../dashboard/navigation/navigation.service';
import { of } from 'rxjs';
import { HttpService } from './http.service';
import { Credentials, User } from '../models/index';


const user: User = {
  userId: 1,
  active: true,
  department: 'bank',
  emailLogin: 'test@test.com',
  firstName: 'Testname',
  lastName: 'Testlastname',
  roles: ['testRole'],
};

const credentials: Credentials = {
  emailLogin: 'test@email.pl',
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
      filterRoutes() {},
    });
    httpSpy = jasmine.createSpyObj('HttpService', {
      post: of(user),
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
    service.login(credentials).subscribe(
      (mockedUser: User) => {
        expect(mockedUser).toBe(user);
        expect(navigationService.filterRoutes).toHaveBeenCalledWith(mockedUser.roles);
        expect(service.loggedIn.getValue()).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalled();
      }
    );
    expect(httpService.post).toHaveBeenCalledWith('users/login', credentials);
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

