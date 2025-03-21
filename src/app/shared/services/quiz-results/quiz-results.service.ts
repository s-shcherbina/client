import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import {
  IQuizResult,
  IQuizResultBody,
  IQuizResultResponse,
  IQuizResultsResponse,
} from '../../interfaces';
import { environment } from '../../../../environtments/environtment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizResultsService {
  http = inject(HttpClient);
  public quizResult = signal({} as IQuizResult);
  public quizzesResults = signal([] as IQuizResult[]);

  constructor(private toast: HotToastService) {}

  public createResult(body: IQuizResultBody) {
    return this.http
      .post<IQuizResultResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-results`,
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
        this.quizResult.set(res.detail);
      });
  }

  public getQuizResults(quizId: string) {
    return this.http
      .get<IQuizResultsResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-results/quiz/${quizId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.quizzesResults.set(res.detail);
      });
  }
}
