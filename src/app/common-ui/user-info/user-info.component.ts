import { Component, Input } from '@angular/core';
import { IUserInfo } from '../../shared/interfaces';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  @Input() user!: IUserInfo;
}
