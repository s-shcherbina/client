import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../common-ui/logo/logo.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import PasswordValidator from '../../../shared/validators/password.validator';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [LogoComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public angularWidth = 160;
  public nestjsWidth = 200;

  public err = signal({} as any);

  public authService = inject(AuthService);
  public router: Router = inject(Router);

  public registerForm: FormGroup;

  constructor(public auth: Auth0Service, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
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
      confirmPassword: [
        '',
        [Validators.required, PasswordValidator.matchPassword],
      ],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .pipe(
          catchError((err) => {
            return throwError(() => {
              this.err.set(err.error);
            });
          })
        )
        .subscribe((res) => {
          this.router.navigate(['']);
        });
    }
  }

  auth0login() {
    this.auth.loginWithRedirect();
    this.router.navigate(['']);
  }
}
