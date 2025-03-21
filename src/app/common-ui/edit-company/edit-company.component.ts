import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyService } from '../../shared/services/company/company.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-edit-company',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.scss',
})
export class EditCompanyComponent {
  @Output()
  close = new EventEmitter<void>();

  @Input()
  public companyId!: string;

  public companyService = inject(CompanyService);
  public router: Router = inject(Router);
  public companyForm: FormGroup;

  constructor(private fb: FormBuilder, private toast: HotToastService) {
    this.companyForm = this.fb.group({
      title: ['', Validators.minLength(2)],
      description: ['', Validators.minLength(8)],
      visibility: [true],
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit() {
    if (this.companyForm.valid) {
      console.log(this.companyId, this.companyForm.value);
      Object.keys(this.companyForm.value).forEach((item) => {
        if (this.companyForm.value[item] === '')
          delete this.companyForm.value[item];
      });
      console.log(this.companyId, this.companyForm.value);
      this.companyService.update(this.companyId, this.companyForm.value);
      this.closeModal();
    }
  }
}
