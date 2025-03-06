import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  IBaseResponse,
  IRegister,
  IUserInfo,
  IUserResponse,
  IUsersResponse,
} from '../../interfaces';
import { environment } from '../../../../environtments/environtment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  public authSevice = inject(AuthService);

  public userById = signal({} as IUserInfo);
  public users = signal([] as IUserInfo[]);

  public getUsers() {
    return this.http.get<IUsersResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/users`
    );
  }

  public update(body: Partial<IRegister>) {
    return this.http.patch<IBaseResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/users`,
      body
    );
  }

  public delete() {
    return this.http.delete<IBaseResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/users`
    );
  }

  public getUserById(id: string) {
    return this.http.get<IUserResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/users/${id}`
    );
  }
}
