import { Component, inject } from '@angular/core';
import { CompanyService } from '../../../shared/services/company/company.service';
import { UserInfoComponent } from '../../../common-ui/user-info/user-info.component';
import { EditCompanyComponent } from '../../../common-ui/edit-company/edit-company.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ActionsService } from '../../../shared/services/actions/actions.service';
import { UsersService } from '../../../shared/services/users/users.service';
import { UserCardComponent } from '../../../common-ui/user-card/user-card.component';
import { ConfirmActionComponent } from '../../../common-ui/confirm-action/confirm-action.component';
import { ICompanyInfo } from '../../../shared/interfaces';
import { HotToastService } from '@ngxpert/hot-toast';
import { QuizService } from '../../../shared/services/quiz/quiz.service';
import { QuizCardComponent } from '../../../common-ui/quiz-card/quiz-card.component';

@Component({
  selector: 'app-company-profile',
  imports: [
    UserInfoComponent,
    EditCompanyComponent,
    UserCardComponent,
    ConfirmActionComponent,
    QuizCardComponent,
  ],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss',
})
export class CompanyProfileComponent {
  public companyService = inject(CompanyService);
  public authService = inject(AuthService);
  public actionsService = inject(ActionsService);
  public usersService = inject(UsersService);
  public quizService = inject(QuizService);
  public router: Router = inject(Router);

  public company = this.companyService.company;
  public currentUser = this.authService.currentUser;
  public users = this.usersService.usersWithActions;
  public action = this.actionsService.action;
  public roleAccess = this.actionsService.roleAccess;
  public memberAccess = this.actionsService.memberAccess;
  public quizzes = this.quizService.quizzes;

  public isVisible = false;
  public isConfirm = false;

  constructor(private toast: HotToastService) {}

  ngOnInit() {
    this.hideUsers();
    this.hideQuizzes();
  }

  showModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  showConfirm() {
    this.isConfirm = true;
  }

  closeConfirm() {
    this.isConfirm = false;
  }

  hideUsers() {
    this.usersService.users.set([]);
  }

  hideQuizzes() {
    this.quizService.quizzes.set([]);
  }

  allUsers() {
    this.actionsService.getAllActions();
    this.usersService.getUsers();
  }

  delete() {
    if (this.company && this.company().owner.id === this.currentUser().id) {
      this.companyService.delete(this.company().id);
      this.router.navigate(['/companies/company_list']);
      this.closeConfirm();
    }
  }

  getCandidates(companyId: string) {
    this.usersService.getCandidates(companyId);
  }

  getInvitedUsers(companyId: string) {
    this.usersService.getInvitedUsers(companyId);
  }

  getMembers(companyId: string) {
    this.usersService.getMembers(companyId);
  }

  checkAccess(company: ICompanyInfo) {
    if (company.owner.email !== this.currentUser().email) {
      this.actionsService.getAction(company.id);
      return this.action().role && this.action().role! < 500;
    }
    return false;
  }

  newQuiz(company: ICompanyInfo) {
    if (this.checkAccess(company)) {
      this.toast.error('Forbiden resource');
    } else {
      this.router.navigate([
        '/companies/company_list/company_profile/create_quiz',
      ]);
    }
  }

  availableQuizzes(companyId: string) {
    this.quizService.getQuizzes(companyId);
  }

  allQuizzes(company: ICompanyInfo) {
    if (this.checkAccess(company)) {
      this.toast.error('Forbiden resource');
    } else {
      this.quizService.getAllQuizzes(company.id);
    }
  }
}
