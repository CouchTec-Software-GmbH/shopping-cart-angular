/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication, provideClientHydration} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import routeConfig from './app/routes';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'your-domain.com' // Replace with your domain
  },
  position: 'bottom-right',
  theme: 'classic',
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff'
    },
    button: {
      background: '#f1d600',
      text: '#000000'
    }
  },
  type: 'info',
  content: {
    message: 'This website collects your data when you get in contact with us.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://cookiesandyou.com'
  }
};

bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(routeConfig),
      provideHttpClient(),
      importProvidersFrom(NgcCookieConsentModule.forRoot(cookieConfig)), provideAnimationsAsync(), provideClientHydration(),
    ]
  }
).catch(err => console.error(err));
