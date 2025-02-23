import { Component, inject, signal } from '@angular/core';
import { CheckHealthService } from '../../shared/services/check-health/check-health.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ICheckHealth } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';

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

  constructor() {
    this.checkHealthService.getCheckHealth().subscribe((val) => {
      this.checkHealth.set(val);
    });
  }
}
