import { Component, inject } from '@angular/core';
import { CompanyService } from '../../../shared/services/company/company.service';
import { UserInfoComponent } from '../../../common-ui/user-info/user-info.component';
import { EditCompanyComponent } from '../../../common-ui/edit-company/edit-company.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  imports: [UserInfoComponent, EditCompanyComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss',
})
export class CompanyProfileComponent {
  public companyService = inject(CompanyService);
  public authService = inject(AuthService);
  public router: Router = inject(Router);

  public company? = this.companyService.company;
  public isVisible = false;
  public currentUser = this.authService.currentUser;

  constructor(private toast: HotToastService) {}

  showModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  delete() {
    if (this.company && this.company().owner.id === this.currentUser().id) {
      this.companyService
        .delete(this.company().id)
        .pipe(
          catchError((err) => {
            return throwError(() => {
              this.toast.error(err.error.message ? err.error.message : 'ERROR');
            });
          })
        )
        .subscribe((res) => {
          this.companyService
            .getMy()
            .pipe(
              catchError((err) => {
                return throwError(() => {
                  this.toast.error(
                    err.error.message ? err.error.message : 'ERROR'
                  );
                });
              })
            )
            .subscribe((val) => this.companyService.companies.set(val.detail));
        });
      this.router.navigate(['/companies/company_list']);
    }
  }
}
