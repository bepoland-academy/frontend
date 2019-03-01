import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { NavigationService } from './navigation.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentUrl: string;
  links: Routes;
  user;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  
  ngOnInit(): void {
    //taking user information
    this.authService.getUserStream().subscribe(user => {
      this.user = user
    })
    
    //gettin links and setting active url link, also calling event resize because material with active link class is bugged
    this.navigationService.getLinks().subscribe(links => {
      this.links = links;
      this.currentUrl = this.router.url.substr(1);
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 200)
      
    });

    //setting current url to changed url from router
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url.substr(1);
    });
  }
  public logout(): void {
    this.authService.logout();
    this.ngZone.run(() => this.router.navigate(['/login']))
  }
}
