import { inject, Injectable, signal } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import {
  IBaseResponse,
  IElem,
  IElemsResponse,
  IQuizAnswer,
  IQuizAnswerBody,
  IQuizAnswerResponse,
} from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environtments/environtment';
import { catchError, throwError } from 'rxjs';
import { QuizService } from '../quiz/quiz.service';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  http = inject(HttpClient);
  public quizService = inject(QuizService);
  public quiz = this.quizService.quiz;
  public quizAnswer = signal({} as IQuizAnswer);
  public quizAnswers = signal([] as IQuizAnswer[]);
  public elems = signal([] as IElem[]);

  constructor(private toast: HotToastService) {}

  public createAnswer(body: IQuizAnswerBody) {
    return this.http
      .post<IQuizAnswerResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-answers`,
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
        this.quizAnswer.set(res.detail);
        this.quizAnswers.update((val) => [...val, res.detail]);
        this.getAnswers(this.quiz().id);
      });
  }

  public getAnswers(quizId: string) {
    return this.http
      .get<IElemsResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-answers/quiz/${quizId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.elems.set(res.detail);
      });
  }

  public update(id: string, body: Partial<IQuizAnswerBody>) {
    return this.http
      .patch<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-answers/${id}`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getAnswers(this.quiz().id));
  }

  public delete(id: string) {
    return this.http
      .delete<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-answers/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.getAnswers(this.quiz().id));
  }
}
