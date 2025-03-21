import { Component, inject, Input, signal } from '@angular/core';
import { CheckHealthService } from '../../shared/services/check-health/check-health.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ICheckHealth } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  public checkHealthService = inject(CheckHealthService);
  public authService = inject(AuthService);

  public checkHealth = signal({} as ICheckHealth);
  public currentUser = this.authService.currentUser;

  constructor(private toast: HotToastService) {
    this.checkHealthService
      .getCheckHealth()
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((val) => {
        this.checkHealth.set(val);
      });
  }
}
