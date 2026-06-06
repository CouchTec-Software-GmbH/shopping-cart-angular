import { bootstrapApplication } from '@angular/platform-browser';
import { mergeApplicationConfig, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig,
} from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'your-domain.com', // Replace with your domain
  },
  position: 'bottom-right',
  theme: 'classic',
  palette: {
    popup: {
      background: '#000000',
      text: '#ffffff',
    },
    button: {
      background: '#f1d600',
      text: '#000000',
    },
  },
  type: 'info',
  content: {
    message: 'This website collects your data when you get in contact with us.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://cookiesandyou.com',
  },
};

// Browser bootstrap = the shared appConfig + the cookie-consent popup, which is
// a browser-only UI library and therefore stays out of the server config.
bootstrapApplication(
  AppComponent,
  mergeApplicationConfig(appConfig, {
    providers: [
      importProvidersFrom(NgcCookieConsentModule.forRoot(cookieConfig)),
    ],
  }),
).catch((err) => console.error(err));
