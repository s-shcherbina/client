import { Routes } from '@angular/router';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CreateQuizComponent } from '../quizzes/create-quiz/create-quiz.component';
import { EditQuizComponent } from '../quizzes/edit-quiz/edit-quiz.component';
import { PassQuizComponent } from '../quizzes/pass-quiz/pass-quiz.component';

export const CompaniesRoutes: Routes = [
  { path: 'company_list/company_profile', component: CompanyProfileComponent },
  { path: 'company_list', component: CompanyListComponent },
  {
    path: 'company_list/company_profile/create_quiz',
    component: CreateQuizComponent,
  },
  {
    path: 'company_list/company_profile/edit_quiz',
    component: EditQuizComponent,
  },
  {
    path: 'company_list/company_profile/pass-quiz',
    component: PassQuizComponent,
  },
];
