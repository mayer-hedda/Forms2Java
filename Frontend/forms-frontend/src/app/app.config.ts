import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { InitService } from './services/init.service';

function initializeAppFactory(initService: InitService) {
  return () => initService.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [InitService],
      multi: true
    }
  ]
};
