import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuestionsService } from '../../shared/services/questions/questions.service';
import { AnswersService } from '../../shared/services/answers/answers.service';

@Component({
  selector: 'app-quiz-answer',
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-answer.component.html',
  styleUrl: './quiz-answer.component.scss',
})
export class QuizAnswerComponent {
  @Output()
  close = new EventEmitter<void>();

  @Input()
  formValue?: { id: string; correct: boolean; text: string };

  public questionsService = inject(QuestionsService);
  public answersService = inject(AnswersService);
  public quizQuestion = this.questionsService.quizQuestion;
  public answerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.answerForm = this.fb.group({
      correct: [false, Validators.required],
      text: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit() {
    if (this.formValue?.id)
      this.answerForm.setValue({
        correct: this.formValue.correct,
        text: this.formValue.text,
      });
  }

  closeAnswer(): void {
    this.close.emit();
  }

  onAnswerSubmit(e: Event) {
    e.preventDefault();
    if (this.answerForm.valid) {
      if (this.formValue?.id) {
        this.answersService.update(this.formValue.id, this.answerForm.value);
      } else {
        this.answersService.createAnswer({
          ...this.answerForm.value,
          element: this.quizQuestion(),
        });
      }
      this.closeAnswer();
    }
  }
}
