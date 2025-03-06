import { Component, inject } from '@angular/core';
import { CompanyService } from '../../../shared/services/company/company.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { CompanyCardComponent } from '../../../common-ui/company-card/company-card.component';
import { HotToastService } from '@ngxpert/hot-toast';
import { CreateCompanyComponent } from '../../../common-ui/create-company/create-company.component';

@Component({
  selector: 'app-company-list',
  imports: [CompanyCardComponent, CreateCompanyComponent],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent {
  public companyService = inject(CompanyService);
  public authService = inject(AuthService);

  public companies = this.companyService.companies;
  public isVisible = false;

  constructor(private toast: HotToastService) {}

  showModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  getAllCompanies() {
    this.companyService
      .getAll()
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => this.companyService.companies.set(res.detail));
  }

  getMyCompanies() {
    this.companyService
      .getMy()
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => this.companyService.companies.set(res.detail));
  }

  a() {}
}
