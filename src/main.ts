/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(routeConfig),
      importProvidersFrom(HttpClientModule),
    ]
  }
).catch(err => console.error(err));
