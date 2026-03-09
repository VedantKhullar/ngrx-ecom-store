import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './shared/store/auth-effect';
import { authFeature } from './shared/store/auth-feature';

export const API_URL = new InjectionToken<string>('API_URL');
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    {
      provide: API_URL,
      useValue: 'https://fakestoreapi.com',
    },
    provideEffects(authEffects),
    provideState(authFeature),
  ],
};
