import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { RoleAuthService } from '../roleAuth.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private roleAuthService: RoleAuthService,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  public logout() {
    this.authService.logout();
    this.ngZone.run(() => this.router.navigate(['/login']))
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url.substr(1);
    this.roleAuthService.getLinks().subscribe(links => this.links = links);
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url.substr(1);
    });
  }

}
