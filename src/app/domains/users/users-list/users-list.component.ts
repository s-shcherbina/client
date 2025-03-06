import { Component, inject, signal } from '@angular/core';
import { IUserInfo } from '../../../shared/interfaces/index';
import { UsersService } from '../../../shared/services/users/users.service';
import { UserCardComponent } from '../../../common-ui/user-card/user-card.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UserListComponent {
  public authService = inject(AuthService);
  public usersService = inject(UsersService);

  public users = signal([] as IUserInfo[]);

  constructor(private toast: HotToastService) {}

  public ngOnInit() {
    if (this.authService.isAuth())
      this.usersService
        .getUsers()
        .pipe(
          catchError((err) => {
            return throwError(() => {
              this.toast.error(err.error.message ? err.error.message : 'ERROR');
            });
          })
        )
        .subscribe((val) => {
          this.users.set(val.detail as IUserInfo[]);
        });
  }
}
