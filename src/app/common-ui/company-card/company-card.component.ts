import { Component, inject, Input } from '@angular/core';
import { CompanyService } from '../../shared/services/company/company.service';
import { ICompanyInfo } from '../../shared/interfaces';
import { RouterLink } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-company-card',
  imports: [RouterLink],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss',
})
export class CompanyCardComponent {
  @Input() company?: ICompanyInfo;

  public companyService = inject(CompanyService);

  constructor(private toast: HotToastService) {}

  getCompanyById(id: string) {
    this.companyService
      .getById(id)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.toast.error(err.error.message ? err.error.message : 'ERROR');
          });
        })
      )
      .subscribe((res) => {
        this.companyService.company.set(res.detail);
      });
  }
}
