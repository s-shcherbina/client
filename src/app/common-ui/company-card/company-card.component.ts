import { Component, inject, Input } from '@angular/core';
import { CompanyService } from '../../shared/services/company/company.service';
import { ICompanyWithAction, IUserInfo } from '../../shared/interfaces';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ActionsService } from '../../shared/services/actions/actions.service';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-company-card',
  imports: [RouterLink, ConfirmActionComponent, EditCompanyComponent],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss',
})
export class CompanyCardComponent {
  @Input()
  company?: ICompanyWithAction;

  public companyService = inject(CompanyService);
  public authService = inject(AuthService);
  public actionsService = inject(ActionsService);

  public currentUser = this.authService.currentUser;
  public actions = this.actionsService.actions;
  public action = this.actionsService.action;

  public isConfirm = false;
  public isDecline = false;
  public isCancel = false;
  public isVisible = false;

  showConfirm() {
    this.isConfirm = true;
  }

  closeConfirm() {
    this.isConfirm = false;
  }

  showDecline() {
    this.isDecline = true;
  }

  closeDecline() {
    this.isDecline = false;
  }

  showCancel() {
    this.isCancel = true;
  }

  closeCancel() {
    this.isCancel = false;
  }

  showModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  getCompanyAndRoleAccess(company: ICompanyWithAction) {
    this.companyService.getById(company!.id);
    this.actionsService.checkAccess(company);
  }

  createAction(company: ICompanyWithAction, user: IUserInfo) {
    delete company.action;
    this.actionsService.createAction({
      ownerVerdict: false,
      userVerdict: true,
      company,
      user,
    });
  }

  removeAction(id: string) {
    this.actionsService.deleteUserAction(id);
    this.closeDecline();
    this.closeCancel();
  }

  acceptInvitation(id: string) {
    this.actionsService.updateUserAction(id, {
      ownerVerdict: true,
      userVerdict: true,
    });
  }

  leaveCompany(id: string) {
    this.actionsService.updateUserAction(id, {
      ownerVerdict: true,
      userVerdict: false,
    });
    this.closeConfirm();
  }
}
