import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICompanyInfo, IUserWithAction } from '../../shared/interfaces';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UsersService } from '../../shared/services/users/users.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ActionsService } from '../../shared/services/actions/actions.service';
import { Role } from '../../shared/interfaces/index';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';

@Component({
  selector: 'app-user-card',
  imports: [UserInfoComponent, ConfirmActionComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user?: IUserWithAction;
  @Input() company?: ICompanyInfo;

  public router: Router = inject(Router);
  public usersService = inject(UsersService);
  public authService = inject(AuthService);
  public actionsService = inject(ActionsService);

  public currentUser = this.authService.currentUser;
  public isConfirm = false;
  public isCancel = false;
  public isDecline = false;
  public isAdmin = false;

  showConfirm() {
    this.isConfirm = true;
  }

  closeConfirm() {
    this.isConfirm = false;
  }

  showCancel() {
    this.isCancel = true;
  }

  closeCancel() {
    this.isCancel = false;
  }

  showDecline() {
    this.isDecline = true;
  }

  closeDecline() {
    this.isDecline = false;
  }

  showAdmin() {
    this.isAdmin = true;
  }

  closeAdmin() {
    this.isAdmin = false;
  }

  getUserById(id: string) {
    this.usersService.getUserById(id);
    this.router.navigate(['/users/user_list/user_profile']);
  }

  createInvitation(company: ICompanyInfo, user: IUserWithAction) {
    delete user.action;
    this.actionsService.createAction({
      ownerVerdict: true,
      userVerdict: false,
      company,
      user,
    });
  }

  removeAction(id: string) {
    this.actionsService.deleteCompanyAction(id);
    this.closeCancel();
    this.closeDecline();
  }

  acceptRequest(id: string) {
    this.actionsService.updateCompanyAction(id, {
      ownerVerdict: true,
      userVerdict: true,
    });
  }

  exclude(id: string) {
    this.actionsService.updateCompanyAction(id, {
      ownerVerdict: false,
      userVerdict: true,
    });
    this.closeConfirm();
  }

  addAdminRole(id: string) {
    this.actionsService.updateRole(id, { role: Role.ADMIN });
  }

  removeAdminRole(id: string) {
    this.actionsService.updateRole(id, { role: Role.MEMBER });
    this.closeAdmin();
  }
}
