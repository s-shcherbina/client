import { Component, EventEmitter, inject, Output, signal } from '@angular/core';

import { HotToastService } from '@ngxpert/hot-toast';
import { QuizInfoComponent } from '../../../common-ui/quiz-info/quiz-info.component';
import { QuizQuestionComponent } from '../../../common-ui/quiz-question/quiz-question.component';
import { QuizAnswerComponent } from '../../../common-ui/quiz-answer/quiz-answer.component';
import { CompanyService } from '../../../shared/services/company/company.service';
import { QuizService } from '../../../shared/services/quiz/quiz.service';
import { QuestionsService } from '../../../shared/services/questions/questions.service';
import { AnswersService } from '../../../shared/services/answers/answers.service';
import { IElem, IQuizQuestion } from '../../../shared/interfaces';
import { MIN_NUM_ANSWERS, MIN_NUM_QUESIONS } from '../../../shared/consts.ts';
import { ConfirmActionComponent } from '../../../common-ui/confirm-action/confirm-action.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  imports: [
    QuizInfoComponent,
    QuizQuestionComponent,
    QuizAnswerComponent,
    ConfirmActionComponent,
  ],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss',
})
export class CreateQuizComponent {
  public router: Router = inject(Router);
  public companyService = inject(CompanyService);
  public quizService = inject(QuizService);
  public questionsService = inject(QuestionsService);
  public answersService = inject(AnswersService);
  public company = this.companyService.company;
  public quizInfo = this.quizService.quiz;
  public quizQuestions = this.questionsService.quizQuestions;
  public quizQuestion = this.questionsService.quizQuestion;
  public quizAnswers = this.answersService.quizAnswers;
  public quizAnswer = this.answersService.quizAnswer;

  public info = false;
  public question = false;
  public answer = false;
  public infoCreate = false;
  public confirmCreateButton = false;
  public isConfirm = false;

  public elems = signal([] as IElem[]);
  public minNumAnswers = MIN_NUM_ANSWERS;
  public minNumQuestions = MIN_NUM_QUESIONS;

  constructor(private toast: HotToastService) {}

  showInfo() {
    this.info = true;
    this.infoCreate = true;
  }

  closeInfo() {
    this.info = false;
  }

  showQuestion() {
    this.question = true;
  }

  closeQuestion() {
    this.question = false;
  }

  showAnswer() {
    this.answer = true;
  }

  closeAnswer() {
    this.answer = false;
  }

  showConfirm() {
    this.isConfirm = true;
  }

  closeConfirm() {
    this.isConfirm = false;
  }

  checkAnswers() {
    if (!this.quizAnswers().find((it) => it.correct)) {
      this.toast.error('There are no correct answers! Add please.');
    } else {
      if (!this.quizAnswers().find((it) => !it.correct)) {
        this.toast.error('There are no incorrect answers! Add please.');
      } else {
        if (this.quizAnswers().filter((it) => it.correct).length > 1)
          this.toast.error(
            'There is more than one correct answer! Delete please.'
          );
        this.elems.update((val) => [
          ...val,
          { quest: this.quizQuestion(), answers: this.quizAnswers() },
        ]);
        this.quizQuestion.set({} as IQuizQuestion);
        this.quizAnswers.set([]);
      }
    }
  }

  checkElements() {
    this.confirmCreateButton = true;
  }

  confirmCreating(id: string) {
    this.quizService.update(id, {
      valid: true,
    });
    this.router.navigate(['/companies/company_list/company_profile']);
  }

  cancel(id: string) {
    console.log(id);
    this.quizService.delete(id);
    this.closeConfirm();
    this.router.navigate(['/companies/company_list/company_profile']);
  }
}
