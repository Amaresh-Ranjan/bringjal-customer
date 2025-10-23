import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideClientHydration ,withEventReplay} from '@angular/platform-browser';
import { globalErrorHandler } from './shared/services/common/error-handler';
import { provideLottieOptions } from 'ngx-lottie';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export function playerFactory() {
  return import('lottie-web') 
}
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withComponentInputBinding()), provideClientHydration(withEventReplay()),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withFetch()),
     { provide: ErrorHandler, useClass: globalErrorHandler },
    provideLottieOptions({ player: playerFactory }),
  ]
};
