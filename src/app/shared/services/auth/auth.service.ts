import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environtments/environtment';
import { ITokensResponse, IUserResponse } from '../../interfaces';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  public isAuth = signal<boolean>(true);
  public currentUser = signal({} as IUserResponse);

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: Auth0Service
  ) {}

  private storageService(val: ITokensResponse) {
    localStorage.setItem('token', val.detail.accessToken as string);
    localStorage.setItem('refreshToken', val.detail.refreshToken as string);
    this.isAuth.set(true);
  }

  public register(body: { name: string; email: string; password: string }) {
    return this.http
      .post<ITokensResponse>(
        `https://interhip-server-965114150226.europe-west3.run.app/auth/register`,
        body
      )
      .pipe(tap((val) => this.storageService(val)));
  }

  public login(body: { email: string; password: string }) {
    return this.http
      .post<ITokensResponse>(
        `https://interhip-server-965114150226.europe-west3.run.app/auth/login`,
        body,
        {
          withCredentials: true,
        }
      )
      .pipe(tap((val) => this.storageService(val)));
  }

  public getMe() {
    return this.http.get<IUserResponse>(
      `https://interhip-server-965114150226.europe-west3.run.app/auth/me`
    );
  }

  public refresh() {
    return this.http
      .post<ITokensResponse>(
        `https://interhip-server-965114150226.europe-west3.run.app/auth/refresh`,
        {
          refreshToken: localStorage.getItem('refreshToken'),
        }
      )
      .pipe(
        tap((val) => this.storageService(val)),
        catchError((err) => {
          return throwError(() => this.logout());
        })
      );
  }

  public logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem('token');
    this.isAuth.set(false);
    this.currentUser.set({} as IUserResponse);
    this.auth.logout({
      logoutParams: { returnTo: document.location.origin },
    });
    if (refreshToken) {
      localStorage.removeItem('refreshToken');
      return this.http.post<string>(
        `https://interhip-server-965114150226.europe-west3.run.app/auth/logout`,
        {
          refreshToken,
        }
      );
    }
    return null;
  }
}
