import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import {
  IBaseResponse,
  IQuizQuestion,
  IQuizQuestionBody,
  IQuizQuestionResponse,
  IQuizQuestionsResponse,
} from '../../interfaces';
import { environment } from '../../../../environtments/environtment';
import { catchError, throwError } from 'rxjs';
import { QuizService } from '../quiz/quiz.service';
import { AnswersService } from '../answers/answers.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  http = inject(HttpClient);
  public quizService = inject(QuizService);
  public answersService = inject(AnswersService);
  public quiz = this.quizService.quiz;
  public quizQuestion = signal({} as IQuizQuestion);
  public quizQuestions = signal([] as IQuizQuestion[]);

  constructor(private toast: HotToastService) {}

  public createQuestion(body: IQuizQuestionBody) {
    return this.http
      .post<IQuizQuestionResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-elements`,
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
        this.quizQuestion.set(res.detail);
        this.quizQuestions.update((val) => [...val, res.detail]);
        this.answersService.getAnswers(this.quiz().id);
      });
  }
  public getQuestions(quizId: string) {
    return this.http
      .get<IQuizQuestionsResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-element/quiz/${quizId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => this.quizQuestions.set(res.detail));
  }

  public update(id: string, body: Partial<IQuizQuestionBody>) {
    return this.http
      .patch<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-elements/${id}`,
        body
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => {
        this.answersService.getAnswers(this.quiz().id);
      });
  }

  public delete(id: string) {
    return this.http
      .delete<IBaseResponse>(
        `https://meduzzen-backend-476208119955.europe-west3.run.app/quiz-elements/${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe(() => this.answersService.getAnswers(this.quiz().id));
  }
}
