import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environtments/environtment';
import { ICheckHealth } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CheckHealthService {
  http = inject(HttpClient);
  public checkHealth = signal({} as ICheckHealth);

  getCheckHealth() {
    return this.http.get<ICheckHealth>(
      `https://meduzzen-backend-476208119955.europe-west3.run.app`
    );
  }
}
