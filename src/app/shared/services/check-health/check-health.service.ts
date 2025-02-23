import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environtments/environtment';
import { ICheckHealth } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CheckHealthService {
  http = inject(HttpClient);

  getCheckHealth() {
    return this.http.get<ICheckHealth>(`${environment.API_URL}`);
  }
}
