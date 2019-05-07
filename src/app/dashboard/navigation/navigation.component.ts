import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { Subscription } from 'rxjs';
import { NavigationService } from '../../core/services/navigation.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  substription: Subscription = new Subscription();
  currentUrl: string;
  links: Routes;
  user = {} as User;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // taking user information
    this.user = JSON.parse(localStorage.getItem('user'));

    // gettin links and setting active url link, also calling event resize because material with active
    // link class is bugged
    this.substription.add(
      this.navigationService.getLinks().subscribe((links: Routes) => {
        this.links = links;
        this.currentUrl = this.urlWithoutQueryString(this.router.url);

        // dispatching new event to set underline to matched url
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 350);
      })
    );

    // setting current url to changed url from router
    this.router.events.subscribe(() => {
      this.currentUrl = this.urlWithoutQueryString(this.router.url);
    });
  }
  logout(): void {
    this.authService.logout();
    this.ngZone.run(() => this.router.navigate(['/login']));
  }

  urlWithoutQueryString(passedUrl) {
    let url = passedUrl.substr(1);
    const index = url.indexOf('?');
    if (index > -1) {
      url = url.substring(0, index);
    }
    return url;
  }

  ngOnDestroy(): void {
    this.substription.unsubscribe();
  }
}
