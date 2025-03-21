import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuizService } from '../../shared/services/quiz/quiz.service';
import { CompanyService } from '../../shared/services/company/company.service';

@Component({
  selector: 'app-quiz-info',
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-info.component.html',
  styleUrl: './quiz-info.component.scss',
})
export class QuizInfoComponent {
  @Output()
  close = new EventEmitter<void>();

  @Input()
  formValue?: {
    id: string;
    title: string;
    description: string;
    frequency: number;
  };

  public quizService = inject(QuizService);
  public companyService = inject(CompanyService);
  public infoForm: FormGroup;
  public company = this.companyService.company;

  constructor(private fb: FormBuilder) {
    this.infoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      frequency: [
        '',
        [Validators.required, Validators.min(1), Validators.max(30)],
      ],
    });
  }

  ngOnInit() {
    if (this.formValue)
      this.infoForm.setValue({
        title: this.formValue.title,
        description: this.formValue.description,
        frequency: this.formValue.frequency,
      });
  }

  closeInfo(): void {
    this.close.emit();
  }

  onInfoSubmit(e: Event) {
    e.preventDefault();
    if (this.infoForm.valid) {
      if (this.formValue) {
        this.quizService.update(this.formValue.id, this.infoForm.value);
      } else {
        this.quizService.createInfo({
          ...this.infoForm.value,
          company: this.company(),
        });
      }
      this.closeInfo();
    }
  }
}
