import { Injectable } from '@angular/core';

export interface NavigationTab {
  name: string;
  path: string;
  role: string;
}

@Injectable()
export class NavigationService {
  role = 'consultant';
  tabs: Array<NavigationTab> = [
    { name: 'Time tracking', path: 'track', role: ['consultant'] },
    { name: 'Historical data', path: 'history' },
    { name: 'Reports', path: 'reports' },
    { name: 'Time approval', path: 'approval' },
    { name: 'Project management', path: 'projects' },
    { name: 'User management', path: 'users' }
  ];
}
