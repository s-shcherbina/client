import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../../shared/services/users/users.service';
import { UserCardComponent } from '../../../common-ui/user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UserListComponent {
  public usersService = inject(UsersService);
  public users = this.usersService.users;
}
