import { Component, inject, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUserInfo } from '../../shared/interfaces';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UsersService } from '../../shared/services/users/users.service';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink, UserInfoComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user?: IUserInfo;

  public usersService = inject(UsersService);

  constructor(private toast: HotToastService) {}

  getUserById(id: string) {
    this.usersService
      .getUserById(id)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.usersService.userById.set(res.detail);
      });
  }
}
