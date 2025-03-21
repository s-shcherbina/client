import { Component, inject, Input } from '@angular/core';
import { IQuizInfo } from '../../shared/interfaces';
import { ActionsService } from '../../shared/services/actions/actions.service';
import { Router } from '@angular/router';
import { QuizService } from '../../shared/services/quiz/quiz.service';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';
import { AnswersService } from '../../shared/services/answers/answers.service';
import { QuizResultsService } from '../../shared/services/quiz-results/quiz-results.service';

@Component({
  selector: 'app-quiz-card',
  imports: [ConfirmActionComponent],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
})
export class QuizCardComponent {
  @Input()
  quiz?: IQuizInfo;

  public router: Router = inject(Router);
  public actionsService = inject(ActionsService);
  public roleAccess = this.actionsService.roleAccess;
  public quizService = inject(QuizService);
  public answersService = inject(AnswersService);
  public quizResultsService = inject(QuizResultsService);
  public elems = this.answersService.elems;
  public isConfirm = false;

  showConfirm() {
    this.isConfirm = true;
  }

  closeConfirm() {
    this.isConfirm = false;
  }

  editQuiz(id: string) {
    this.quizService.getQuiz(id);
    this.router.navigate(['/companies/company_list/company_profile/edit_quiz']);
  }

  delete(id: string) {
    this.quizService.delete(id);
    this.closeConfirm();
    this.quizService.quizzes.set([]);
  }

  takeQuiz(id: string) {
    this.elems.set([]);
    this.quizService.getQuiz(id);
    this.quizResultsService.getQuizResults(id);
    this.router.navigate(['/companies/company_list/company_profile/pass-quiz']);
  }
}
