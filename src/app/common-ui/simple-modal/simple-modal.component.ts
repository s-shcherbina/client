import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IPasswordValidator, IUserInfo } from '../../shared/interfaces';
import { UserInfoComponent } from '../user-info/user-info.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import PasswordValidator from '../../shared/validators/password.validator';
import { passwordErrors } from '../../shared/moks';
import { UsersService } from '../../shared/services/users/users.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CompanyService } from '../../shared/services/company/company.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-simple-modal',
  imports: [UserInfoComponent, ReactiveFormsModule],
  templateUrl: './simple-modal.component.html',
  styleUrl: './simple-modal.component.scss',
})
export class SimpleModalComponent {
  public router: Router = inject(Router);
  public usersService = inject(UsersService);
  public companyService = inject(CompanyService);
  public authService = inject(AuthService);

  public edit: boolean = false;
  public create: boolean = false;
  public change: boolean = false;

  public editForm: FormGroup;
  public companyForm: FormGroup;
  public passwordForm: FormGroup;

  public passwordErrors: IPasswordValidator[] = passwordErrors;

  @Input()
  public user?: IUserInfo;

  @Output()
  close = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private toast: HotToastService) {
    this.editForm = this.fb.group({
      name: ['', [Validators.minLength(2)]],
      avatar: ['', [Validators.minLength(8)]],
    });

    this.passwordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          PasswordValidator.passwordStrength,
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength,
          PasswordValidator.matchPassword,
        ],
      ],
    });

    this.companyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      visibility: [true, [Validators.required]],
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  createdCompanies() {
    this.router.navigate(['/companies/company_list']);
    this.closeModal();
  }

  editVisible() {
    this.edit = !this.edit;
  }

  passwordVisible() {
    this.change = !this.change;
  }

  companyVisible() {
    this.create = !this.create;
  }

  onEditSubmit() {
    if (this.editForm.valid) {
      Object.keys(this.editForm.value).forEach((item) => {
        if (!this.editForm.value[item]) delete this.editForm.value[item];
      });
      this.usersService
        .update(this.editForm.value)
        .pipe(
          catchError((err) => {
            return throwError(() => {
              this.toast.error(err.error.message ? err.error.message : 'ERROR');
            });
          })
        )
        .subscribe((res) => {
          this.authService.getMe().subscribe((val) => {
            this.authService.currentUser.set(val.detail);
          });
        });
      this.router.navigate(['']);
      this.closeModal();
    }
  }

  onPasswordSubmit() {
    if (this.passwordForm.valid) {
      delete this.passwordForm.value.confirmPassword;
      this.usersService.update(this.passwordForm.value).pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      );
      this.router.navigate(['']);
      this.closeModal();
    }
  }

  delete() {
    this.usersService
      .delete()
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.authService.logout();
      });
    this.closeModal();
  }

  onCompanySubmit() {
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
