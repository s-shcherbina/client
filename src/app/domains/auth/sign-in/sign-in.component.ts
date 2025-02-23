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

@Component({
  selector: 'app-sign-in',
  imports: [LogoComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  public angularWidth = 160;
  public nestjsWidth = 200;

  public err = signal({} as any);

  public authService = inject(AuthService);
  public router: Router = inject(Router);

  public loginForm: FormGroup;

  constructor(public auth: Auth0Service, private fb: FormBuilder) {
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
              this.err.set(err.error);
            });
          })
        )
        .subscribe((res) => this.router.navigate(['']));
    }
  }
}
