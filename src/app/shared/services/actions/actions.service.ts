import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  IAction,
  IActionBody,
  IActionResponse,
  IActionsResponse,
  IBaseResponse,
  ICompanyWithAction,
} from '../../interfaces';
import { environment } from '../../../../environtments/environtment';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  http = inject(HttpClient);
  public authService = inject(AuthService);
  public action = signal({} as IAction);
  public actions = signal([] as IAction[]);
  public invitations = signal([] as IAction[]);
  public roleAccess = false;
  public memberAccess = false;
  public currentUser = this.authService.currentUser;

  constructor(private toast: HotToastService) {}

  public createAction(body: IActionBody) {
    return this.http
      .post<IActionResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.actions.update((val) => [...val, res.detail]);
      });
  }

  getAllActions() {
    return this.http
      .get<IActionsResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.actions.set(res.detail);
      });
  }

  public deleteCompanyAction(id: string) {
    return this.http
      .delete<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/company/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getAllActions());
  }

  public deleteUserAction(id: string) {
    return this.http
      .delete<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/user/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getAllActions());
  }

  public updateCompanyAction(id: string, body: Partial<IActionBody>) {
    return this.http
      .patch<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/company/${id}`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getAllActions());
  }

  public updateUserAction(id: string, body: Partial<IActionBody>) {
    return this.http
      .patch<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/user/${id}`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getAllActions());
  }

  public updateRole(id: string, body: Partial<IActionBody>) {
    return this.http
      .patch<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/company/role/${id}`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getAllActions());
  }

  public getAction(companyId: string) {
    return this.http
      .get<IActionResponse>(
        `${environment.API_URL}/actions/company_user/${companyId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.action.set(res.detail);
      });
  }

  public checkAccess(company: ICompanyWithAction) {
    if (company.owner.email !== this.currentUser().email) {
      this.getAction(company.id);
      this.roleAccess = this.action().role! >= 500;
      this.memberAccess = this.action().role! >= 100;
    } else {
      this.roleAccess = true;
      this.memberAccess = true;
    }
  }
}
