import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import routeConfig from './routes';

// Shared providers used by BOTH the browser and the server bootstrap.
// Anything the app needs in order to render (router, http, hydration) must
// live here so the server renders the same content the client expects.
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideClientHydration(),
  ],
};
