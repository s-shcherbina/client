import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environtments/environtment';
import {
  IBaseResponse,
  ICompaniesResponse,
  ICompany,
  ICompanyInfo,
  ICompanyResponse,
  ICompanyWithAction,
} from '../../interfaces';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActionsService } from '../actions/actions.service';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  http = inject(HttpClient);
  public actionsService = inject(ActionsService);
  public authService = inject(AuthService);

  public company = signal({} as ICompanyInfo);
  public companies = signal([] as ICompanyInfo[]);
  public actions = this.actionsService.actions;
  public currentUser = this.authService.currentUser;
  public companiesWithActions = computed(
    () =>
      this.companies().map((it) => ({
        ...it,
        action: this.actions().find(
          (a) => a.company.id === it.id && a.user.id === this.currentUser().id
        ),
      })) as ICompanyWithAction[]
  );

  constructor(private toast: HotToastService) {}

  public create(body: ICompany) {
    return this.http
      .post<ICompanyResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/companies`,
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
        this.company.set(res.detail);
        this.companies.update((val) => [...val, res.detail]);
      });
  }

  public getAll() {
    return this.http
      .get<ICompaniesResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/companies`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.companies.set(res.detail);
      });
  }

  public getMy() {
    return this.http
      .get<ICompaniesResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/companies/my`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => this.companies.set(res.detail));
  }

  public getById(id: string) {
    return this.http
      .get<ICompanyResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/companies/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.company.set(res.detail);
        this.companies.update((val) => [...val, res.detail]);
      });
  }

  public update(id: string, body: Partial<ICompany>) {
    return this.http
      .patch<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/companies/${id}`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getById(id));
  }

  public delete(id: string) {
    return this.http
      .delete<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/companies/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => {
        this.getMy();
      });
  }

  public getRequests() {
    return this.http
      .get<ICompaniesResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/users/requests`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.companies.set(res.detail);
      });
  }

  public getInvitations() {
    return this.http
      .get<ICompaniesResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/actions/users/invitations`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => this.companies.set(res.detail));
  }
}
