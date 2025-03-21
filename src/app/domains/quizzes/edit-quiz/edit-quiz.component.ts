import { Component, inject } from '@angular/core';
import { QuizService } from '../../../shared/services/quiz/quiz.service';
import { QuestionsService } from '../../../shared/services/questions/questions.service';
import { AnswersService } from '../../../shared/services/answers/answers.service';
import { QuizInfoComponent } from '../../../common-ui/quiz-info/quiz-info.component';
import { QuizQuestionComponent } from '../../../common-ui/quiz-question/quiz-question.component';
import { QuizAnswerComponent } from '../../../common-ui/quiz-answer/quiz-answer.component';
import { ConfirmActionComponent } from '../../../common-ui/confirm-action/confirm-action.component';
import { IQuizAnswer, IQuizQuestion } from '../../../shared/interfaces';
import { MIN_NUM_ANSWERS, MIN_NUM_QUESIONS } from '../../../shared/consts.ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-quiz',
  imports: [
    QuizInfoComponent,
    QuizQuestionComponent,
    QuizAnswerComponent,
    ConfirmActionComponent,
  ],
  templateUrl: './edit-quiz.component.html',
  styleUrl: './edit-quiz.component.scss',
})
export class EditQuizComponent {
  public router: Router = inject(Router);
  public quizService = inject(QuizService);
  public questionsService = inject(QuestionsService);
  public answersService = inject(AnswersService);
  public quizQuestion = this.questionsService.quizQuestion;
  public quizAnswer = this.answersService.quizAnswer;
  public quizAnswers = this.answersService.quizAnswers;
  public quizInfo = this.quizService.quiz;
  public elems = this.answersService.elems;

  public info = false;
  public question = false;
  public answer = false;
  public isConfirm = false;

  public minNumAnswers = MIN_NUM_ANSWERS;
  public minNumQuestions = MIN_NUM_QUESIONS;
  public deleteElem!: () => void;

  showInfo() {
    this.info = true;
  }

  closeInfo() {
    this.info = false;
  }

  showElements(id: string) {
    this.answersService.getAnswers(id);
  }

  showQuestion(elem?: IQuizQuestion) {
    if (elem) this.quizQuestion.set(elem);
    this.question = true;
  }

  closeQuestion() {
    this.question = false;
  }

  showAnswer(answer?: IQuizAnswer) {
    if (answer) this.quizAnswer.set(answer);
    this.answer = true;
  }

  closeAnswer() {
    this.answer = false;
  }

  showConfirm(elem: string, id: string) {
    if (elem === 'quiz')
      this.deleteElem = () => {
        this.quizService.delete(id);
        this.router.navigate(['/companies/company_list/company_profile']);
        this.closeConfirm();
      };
    if (elem === 'question')
      this.deleteElem = () => {
        this.questionsService.delete(id);
        this.closeConfirm();
      };
    if (elem === 'answer')
      this.deleteElem = () => {
        this.answersService.delete(id);
        this.closeConfirm();
      };

    this.closeConfirm();

    this.isConfirm = true;
  }

  closeConfirm() {
    this.isConfirm = false;
  }

  delete(id: string) {
    this.quizService.delete(id);
  }

  addElement() {
    this.quizQuestion.set({} as IQuizQuestion);
    this.question = true;
  }

  addAnswer(elem: IQuizQuestion) {
    this.quizQuestion.set(elem);
    this.quizAnswer.set({} as IQuizAnswer);
    this.answer = true;
  }
}
