import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (!token) return next(req);

  if (isRefreshing) return refresh(req, next, authService);
  return next(addToken(req, token)).pipe(
    catchError((err) => {
      if (err.status == 401) {
        return refresh(req, next, authService);
      }

      return throwError(() => err);
    })
  );
};
const refresh = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  AuthService: AuthService
) => {
  if (!isRefreshing) {
    isRefreshing = true;
    return AuthService.refresh().pipe(
      switchMap((res) => {
        isRefreshing = false;
        return next(addToken(req, res.detail.accessToken as string));
      })
    );
  }
  return next(addToken(req, localStorage.getItem('token') as string));
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
};
