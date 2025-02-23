import { Routes } from '@angular/router';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { authorizedGuard } from './shared/guards/authorized.guard';
import { unauthorizedGuard } from './shared/guards/unauthorized.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domains/welcome/welcome.component').then(
            (c) => c.WelcomeComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./domains/about/about.component').then(
            (c) => c.AboutComponent
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./domains/users/users.routes').then((c) => c.UsersRoutes),
        canActivate: [authorizedGuard],
      },
      {
        path: 'companies',
        loadChildren: () =>
          import('./domains/companies/companies.routes').then(
            (c) => c.CompaniesRoutes
          ),
        canActivate: [authorizedGuard],
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./domains/auth/auth.routes').then((c) => c.AuthRoutes),
    canActivate: [unauthorizedGuard],
  },
];
