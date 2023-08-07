import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';



import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({}), [BrowserAnimationsModule]),
    provideRouter(routes),
    provideHttpClient()

  ],
});
