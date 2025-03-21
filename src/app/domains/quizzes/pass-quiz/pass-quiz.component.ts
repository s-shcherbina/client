import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../shared/services/quiz/quiz.service';
import { AnswersService } from '../../../shared/services/answers/answers.service';
import { QuizResultsService } from '../../../shared/services/quiz-results/quiz-results.service';
import { FRECUENCY_MS } from '../../../shared/consts.ts';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-pass-quiz',
  imports: [],
  templateUrl: './pass-quiz.component.html',
  styleUrl: './pass-quiz.component.scss',
})
export class PassQuizComponent {
  public router: Router = inject(Router);
  public quizService = inject(QuizService);
  public answersService = inject(AnswersService);
  public quizResultsService = inject(QuizResultsService);
  public quizInfo = this.quizService.quiz;
  public elems = this.answersService.elems;
  public quizResults = this.quizResultsService.quizResult;
  public quizzesResults = this.quizResultsService.quizzesResults;

  public index = signal(0);
  public correctUserAnswer = signal(0);
  public visible = signal(false);
  public selected = signal(false);
  public visibleResults = signal(false);
  public dayMs = FRECUENCY_MS;

  constructor(private toast: HotToastService) {}

  getElements(id: string, frequency: number) {
    const daysAfterQuiz =
      (new Date().getTime() -
        new Date(this.quizzesResults()[0].createdAt).getTime()) /
      this.dayMs;
    if (daysAfterQuiz < frequency) {
      this.toast.error(
        `This test can be taken in ${Math.round(
          frequency - daysAfterQuiz
        )} days `
      );
    } else {
      this.answersService.getAnswers(id);
    }
  }

  updateIndex() {
    this.index.update((val) => val + 1);
    if (this.selected()) this.correctUserAnswer.update((val) => val + 1);
    this.visible.set(false);
  }

  changeFunc(answer: boolean) {
    this.visible.set(true);
    this.selected.set(answer);
  }

  quizResult() {
    this.quizResultsService.createResult({
      questions: this.elems().length,
      correctAnswers: this.correctUserAnswer(),
      quiz: this.quizInfo(),
    });
    this.visibleResults.set(true);
  }

  goBack() {
    this.elems.set([]);
    this.visibleResults.set(false);
    this.router.navigate(['/companies/company_list/company_profile']);
  }
}
