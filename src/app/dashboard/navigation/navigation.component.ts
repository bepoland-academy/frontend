import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { RoleAuthService } from '../roleAuth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUrl: string;
  links: Routes;
  constructor(
    private router: Router,
    private roleAuthService: RoleAuthService
    ) { }

  ngOnInit(): void {
    this.links = this.roleAuthService.getLinks();
    this.router.events.subscribe(() => {
        this.currentUrl = this.router.url.substr(1);
      });
    }

}
