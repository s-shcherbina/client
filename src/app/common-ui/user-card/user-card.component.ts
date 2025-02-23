import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUserInfo } from '../../shared/interfaces';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user?: IUserInfo;
}
