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
      domain: 'dev-qqr1um2mnzvr1ecv.us.auth0.com',
      clientId: '4pyTHsfzWSRzpjo65Bau4SEl3Z2zPBvd',
      // domain: environment.AUTH0_DOMAIN as string,
      // clientId: environment.AUTH0_CLIENT_ID as string,
      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: 'profile email',
      },
    }),
  ],
};
