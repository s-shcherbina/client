import { Component, inject, signal } from '@angular/core';
import { IUsersResponse } from '../../../shared/interfaces/index';
import { UsersService } from '../../../shared/services/users/users.service';
import { UserCardComponent } from '../../../common-ui/user-card/user-card.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UserListComponent {
  public authService = inject(AuthService);
  public usersService = inject(UsersService);
  public router: Router = inject(Router);

  public users = signal({} as IUsersResponse);

  public ngOnInit() {
    if (this.authService.isAuth())
      this.usersService.getUsers().subscribe((val) => {
        this.users.set(val as IUsersResponse);
      });
  }
}
