import { Component, inject } from '@angular/core';
import { CompanyService } from '../../../shared/services/company/company.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CompanyCardComponent } from '../../../common-ui/company-card/company-card.component';
import { CreateCompanyComponent } from '../../../common-ui/create-company/create-company.component';
import { ActionsService } from '../../../shared/services/actions/actions.service';

@Component({
  selector: 'app-company-list',
  imports: [CompanyCardComponent, CreateCompanyComponent],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent {
  public companyService = inject(CompanyService);
  public actionsService = inject(ActionsService);
  public authService = inject(AuthService);
  public currentUser = this.authService.currentUser;

  public companies = this.companyService.companies;
  public actions = this.actionsService.actions;
  public companiesWithActions = this.companyService.companiesWithActions;
  public isVisible = false;

  showModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  getMyCompanies() {
    this.companyService.getMy();
  }

  getRequests() {
    this.companyService.getRequests();
  }

  getInvitations() {
    this.companyService.getInvitations();
  }
}
