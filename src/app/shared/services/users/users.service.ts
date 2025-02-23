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
    return this.http.get<IUsersResponse>(`${environment.API_URL}users`);
  }
}
