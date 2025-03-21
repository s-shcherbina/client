import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environtments/environtment';
import {
  ILogin,
  IRegister,
  ITokensResponse,
  IUserInfo,
  IUserResponse,
} from '../../interfaces';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  public isAuth = signal<boolean>(true);
  public currentUser = signal({} as IUserInfo);

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: Auth0Service,
    private toast: HotToastService
  ) {}

  private storageService(val: ITokensResponse) {
    localStorage.setItem('token', val.detail.accessToken as string);
    localStorage.setItem('refreshToken', val.detail.refreshToken as string);
    this.isAuth.set(true);
  }

  public register(body: IRegister): Observable<ITokensResponse> {
    return this.http
      .post<ITokensResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/auth/register`,
        body
      )
      .pipe(tap((val) => this.storageService(val)));
  }

  public login(body: ILogin): Observable<ITokensResponse> {
    return this.http
      .post<ITokensResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/auth/login`,
        body
      )
      .pipe(tap((val) => this.storageService(val)));
  }

  public getMe() {
    return this.http
      .get<IUserResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/auth/me`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((val) => this.currentUser.set(val.detail as IUserInfo));
  }

  public refresh(): Observable<ITokensResponse> {
    return this.http
      .post<ITokensResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/auth/refresh`,
        {
          refreshToken: localStorage.getItem('refreshToken'),
        }
      )
      .pipe(
        tap((val) => this.storageService(val)),
        catchError((err) => {
          this.toast.error(err.error.message ? err.error.message : 'ERROR');
          return throwError(() => this.logout());
        })
      );
  }

  public logout(): Observable<string> | null {
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem('token');
    this.isAuth.set(false);
    this.currentUser.set({} as IUserInfo);
    this.auth.logout({
      logoutParams: { returnTo: document.location.origin },
    });
    if (refreshToken) {
      localStorage.removeItem('refreshToken');
      return this.http.post<string>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/auth/logout`,
        {
          refreshToken,
        }
      );
    }
    return null;
  }
}
