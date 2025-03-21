import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { QuizService } from '../../shared/services/quiz/quiz.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuestionsService } from '../../shared/services/questions/questions.service';

@Component({
  selector: 'app-quiz-question',
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss',
})
export class QuizQuestionComponent {
  @Output()
  close = new EventEmitter<void>();

  @Input()
  formValue?: { id: string; question: string };

  public quizService = inject(QuizService);
  public questionsService = inject(QuestionsService);
  public quiz = this.quizService.quiz;
  public question = this.questionsService.quizQuestion;

  public questionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
    if (this.formValue?.id)
      this.questionForm.setValue({
        question: this.formValue.question,
      });
  }

  closeQuestion(): void {
    this.close.emit();
  }

  onQuestionSubmit(e: Event) {
    e.preventDefault();

    if (this.questionForm.valid) {
      if (this.formValue?.id) {
        this.questionsService.update(
          this.formValue.id,
          this.questionForm.value
        );
      } else {
        this.questionsService.createQuestion({
          ...this.questionForm.value,
          quiz: this.quiz(),
        });
      }
      this.closeQuestion();
    }
  }
}
