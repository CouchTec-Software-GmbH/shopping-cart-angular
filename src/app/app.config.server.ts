import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// Server bootstrap = the shared appConfig + server rendering. This is what was
// missing: previously the server bootstrapped with no providers at all, so it
// rendered an empty <router-outlet> and the client had to render everything
// from scratch (the flicker).
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
