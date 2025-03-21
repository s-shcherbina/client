import { Component, inject } from '@angular/core';
import { UsersService } from '../../../shared/services/users/users.service';
import { UserInfoComponent } from '../../../common-ui/user-info/user-info.component';

@Component({
  selector: 'app-user-profile',
  imports: [UserInfoComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  public usersService = inject(UsersService);
  public user? = this.usersService.userById;
}
