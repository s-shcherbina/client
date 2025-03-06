import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyService } from '../../shared/services/company/company.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-create-company',
  imports: [ReactiveFormsModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss',
})
export class CreateCompanyComponent {
  @Output()
  close = new EventEmitter<void>();

  public companyService = inject(CompanyService);
  public router: Router = inject(Router);
  public companyForm: FormGroup;

  constructor(private fb: FormBuilder, private toast: HotToastService) {
    this.companyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      visibility: [true, [Validators.required]],
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit() {
    if (this.companyForm.valid) {
      this.companyService
        .create(this.companyForm.value)
        .pipe(
          catchError((err) => {
            return throwError(() => {
              this.toast.error(err.error.message ? err.error.message : 'ERROR');
            });
          })
        )
        .subscribe((res) => {
          this.companyService.company.set(res.detail);
        });
      this.router.navigate(['/companies/company_list/company_profile']);
      this.closeModal();
    }
  }
}
