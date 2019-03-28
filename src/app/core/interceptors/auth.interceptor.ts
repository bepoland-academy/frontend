import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authHeader = JSON.parse(localStorage.getItem('token'));
    if (authHeader) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authHeader),
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
