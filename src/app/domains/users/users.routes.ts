import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './users-list/users-list.component';

export const UsersRoutes: Routes = [
  { path: 'user_list/user_profile', component: UserProfileComponent },
  { path: 'user_list', component: UserListComponent },
];
