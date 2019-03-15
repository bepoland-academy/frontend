import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
   username: string;
   password: string;
   isLoading = false;
   errorMessage = '';

  constructor(
   private router: Router,
   private authService: AuthService,
   private ngZone: NgZone
  ) {}

   login(): void {
    this.isLoading = true;
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        () => this.isLoading = false,
        (err) => {
          this.isLoading = false;
          if ((/^[4]\d/g).test(err.status)) {
            this.errorMessage = 'Bad credentials login or password is wrong.';
          } else if ((/^[5]/g).test(err.status)) {
            this.errorMessage = 'Some problems occur in the server, please contact administrator';
          } else {
            this.errorMessage = 'Check your internet connection';
          }
        }
      );
  }

   ngOnInit(): void {
    this.authService.loggedIn.subscribe((value: boolean) => {
      if (value) {
        this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
      }
    });

    const data = [
      {
       name: 'secondPro',
       rate: 245,
       comments: 'second',
       department: '77065bda-b226-4b39-9092-94f48aaaa042',
       client: {
         clientId: 'c0ed05e5-a6d1-488a-9f1c-d9a152ea4617',
         name: 'PZU',
       },
       active: false,
       _links: {
         self: {
           href: 'http://localhost:8080/projects/8b03fb47-3467-43a1-a4d0-b029002b0de9',
         },
         DELETE: {
           href: 'http://localhost:8080/projects/8b03fb47-3467-43a1-a4d0-b029002b0de9',
         },
       },
     },
      {
        name: 'secondPro',
        rate: 245,
        comments: 'second',
        department: '77065bda-b226-4b39-9092-94f48aaaa042',
        client: {
          clientId: 'c0ed05e5-a6d1-488a-9f1c-d9a152ea4617',
          name: 'UNIQA',
        },
        active: false,
        _links: {
          self: {
            href: 'http://localhost:8080/projects/8b03fb47-3467-43a1-a4d0-b029002b0de9',
          },
          DELETE: {
            href: 'http://localhost:8080/projects/8b03fb47-3467-43a1-a4d0-b029002b0de9',
          },
        },
      },
      {
        name: 'secondPro',
        rate: 245,
        comments: 'second',
        department: '77065bda-b226-4b39-9092-94f48aaaa042',
        client: {
          clientId: 'c0ed05e5-a6d1-488a-9f1c-d9a152ea4617',
          name: 'UNIQA',
        },
        active: false,
        _links: {
          self: {
            href: 'http://localhost:8080/projects/8b03fb47-3467-43a1-a4d0-b029002b0de9',
          },
          DELETE: {
            href: 'http://localhost:8080/projects/8b03fb47-3467-43a1-a4d0-b029002b0de9',
          },
        },
      },
    ];
    let group_to_values = data.reduce((obj, item) => {
      obj[item.client.name] = obj[item.client.name] || [];
      obj[item.client.name].push(item);
      return obj;
     }, {});
    const groups = Object.keys(group_to_values).map((key) => {
       return { clientName: key, projects: group_to_values[key] };
     });
  }

 }
