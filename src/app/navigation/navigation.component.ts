import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationService, NavigationTab } from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUrl: string;
  links: Array<NavigationTab>;
  constructor(
    private router: Router,
    private navigationService: NavigationService
    ) { }

ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url.substr(1);
    });
  }

}
