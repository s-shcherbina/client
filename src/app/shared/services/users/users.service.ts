import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUsersResponse } from '../../interfaces';
import { environment } from '../../../../environtments/environtment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);

  public getUsers() {
    return this.http.get<IUsersResponse>(
      `https://intership-backend-965114150226.europe-west10.run.app/users`
    );
  }
}
