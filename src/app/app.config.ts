import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environtments/environtment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAuth0({
      domain: 'dev-3batz0jnnxsygwbc.us.auth0.com',
      clientId: 'U6ZArzDJ2124QiMN2vrJlaJYdyHDTYRn',
      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: 'profile email',
      },
    }),
  ],
};
