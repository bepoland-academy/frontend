import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavigationService } from './services/navigation.service';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { AuthGuard } from './guards/auth.guard';
import { GlobalDataService } from './services/global-data.service';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [
    AuthGuard,
    NavigationService,
    AuthService,
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
    GlobalDataService,
  ],
  exports: [],
})
export class CoreModule {}
