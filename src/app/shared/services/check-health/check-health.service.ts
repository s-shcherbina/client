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
    console.log(environment.API_URL);
    console.log(environment.AUTH0_DOMAIN);
    console.log(environment.AUTH0_CLIENT_ID);

    return this.http.get<ICheckHealth>(
      `https://interhip-server-965114150226.europe-west3.run.app`
    );
  }
}
