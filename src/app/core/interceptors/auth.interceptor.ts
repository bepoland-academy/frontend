import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth header (fake value is shown here)
    const authHeader = JSON.parse(localStorage.getItem('token')); // this.authService.getAuthToken();
    if (authHeader) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authHeader),
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
