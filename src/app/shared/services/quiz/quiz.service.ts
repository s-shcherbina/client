import { inject, Injectable, signal } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import {
  IBaseResponse,
  IQuizInfo,
  IQuizInfoBody,
  IQuizInfoResponse,
  IQuizzesInfoResponse,
} from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../company/company.service';
import { environment } from '../../../../environtments/environtment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  http = inject(HttpClient);
  public companyService = inject(CompanyService);
  public company = this.companyService.company;

  public quiz = signal({} as IQuizInfo);
  public quizzes = signal([] as IQuizInfo[]);

  constructor(private toast: HotToastService) {}

  public createInfo(body: IQuizInfoBody) {
    return this.http
      .post<IQuizInfoResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quizzes`,
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
        this.quiz.set(res.detail);
        this.quizzes.update((val) => [...val, res.detail]);
      });
  }

  public getQuizzes(companyId: string) {
    return this.http
      .get<IQuizzesInfoResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quizzes/company/${companyId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.quizzes.set(res.detail);
      });
  }

  public getAllQuizzes(companyId: string) {
    return this.http
      .get<IQuizzesInfoResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quizzes/all/${companyId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.quizzes.set(res.detail);
      });
  }

  public getQuiz(id: string) {
    return this.http
      .get<IQuizInfoResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quizzes/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => this.quiz.set(res.detail));
  }

  public delete(id: string) {
    return this.http
      .delete<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quizzes/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.quiz.set({} as IQuizInfo));
  }

  public update(id: string, body: Partial<IQuizInfo>) {
    return this.http
      .patch<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quizzes/${id}`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getQuiz(id));
  }
}
