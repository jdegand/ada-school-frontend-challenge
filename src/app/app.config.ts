import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app.data';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(AppData, { delay: 1000, dataEncapsulation: false })),
    provideRouter(routes, withComponentInputBinding())
  ]
};