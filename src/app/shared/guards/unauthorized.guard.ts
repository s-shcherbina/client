import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const unauthorizedGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthService).isAuth()) return true;
  return inject(Router).createUrlTree(['']);
};
