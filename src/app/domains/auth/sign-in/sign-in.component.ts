import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { LogoComponent } from '../../../common-ui/logo/logo.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import PasswordValidator from '../../../shared/validators/password.validator';
import { IPasswordValidator } from '../../../shared/interfaces';
import { passwordErrors } from '../../../shared/moks';
import { HotToastService } from '@ngxpert/hot-toast';
import {
  LOGO_ANGULAR_WIDTH,
  LOGO_NESTJS_WIDTH,
} from '../../../shared/consts.ts';

@Component({
  selector: 'app-sign-in',
  imports: [LogoComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  public angularWidth = LOGO_ANGULAR_WIDTH;
  public nestjsWidth = LOGO_NESTJS_WIDTH;

  public authService = inject(AuthService);
  public router: Router = inject(Router);

  public loginForm: FormGroup;
  public passwordErrors: IPasswordValidator[] = passwordErrors;

  constructor(
    public auth: Auth0Service,
    private fb: FormBuilder,
    private toast: HotToastService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          PasswordValidator.passwordStrength,
        ],
      ],
    });
  }

  auth0login() {
    this.auth.loginWithRedirect();
    this.router.navigate(['']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(
          catchError((err) => {
            return throwError(() => {
              this.toast.error(err.error.message ? err.error.message : 'ERROR');
            });
          })
        )
        .subscribe(() => this.router.navigate(['']));
    }
  }
}
