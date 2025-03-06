import { Routes } from '@angular/router';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CompanyListComponent } from './company-list/company-list.component';

export const CompaniesRoutes: Routes = [
  { path: 'company_profile', component: CompanyProfileComponent },
  { path: 'company_list', component: CompanyListComponent },
];
