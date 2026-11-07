import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalErrorInterceptor } from './core/interceptors/global-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([globalErrorInterceptor]) // So I can have HttpErrorResponses custom handled
    ), // So I can use HttpClient in my services
  ]
};
