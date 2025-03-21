import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  IBaseResponse,
  IRegister,
  IUserInfo,
  IUserResponse,
  IUsersResponse,
  IUserWithAction,
} from '../../interfaces';
import { environment } from '../../../../environtments/environtment';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActionsService } from '../actions/actions.service';
import { CompanyService } from '../company/company.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  public actionsService = inject(ActionsService);
  public companyService = inject(CompanyService);
  public authService = inject(AuthService);

  public userById = signal({} as IUserInfo);
  public users = signal([] as IUserInfo[]);
  public actions = this.actionsService.actions;
  public company = this.companyService.company;
  public usersWithActions = computed(
    () =>
      this.users().map((u) => ({
        ...u,
        action: this.actions().find(
          (a) => a.user.id === u.id && a.company.id === this.company().id
        ),
      })) as IUserWithAction[]
  );

  constructor(private toast: HotToastService) {}

  public getUsers() {
    return this.http
      .get<IUsersResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/users`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => this.users.set(res.detail));
  }

  public update(body: Partial<IRegister>) {
    return this.http
      .patch<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/users`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.authService.getMe());
  }

  public delete() {
    return this.http
      .delete<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/users`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.authService.logout());
  }

  public getUserById(id: string) {
    return this.http
      .get<IUserResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/users/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => this.userById.set(res.detail));
  }

  public getCandidates(companyId: string) {
    return this.http
      .get<IUsersResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/candidates/${companyId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.users.set(res.detail);
      });
  }

  public getInvitedUsers(companyId: string) {
    return this.http
      .get<IUsersResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/invited/${companyId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.users.set(res.detail);
      });
  }

  public getMembers(companyId: string) {
    return this.http
      .get<IUsersResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/members/${companyId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.users.set(res.detail);
      });
  }
}
