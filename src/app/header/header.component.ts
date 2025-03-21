import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { LogoComponent } from '../common-ui/logo/logo.component';
import { AuthService } from '../shared/services/auth/auth.service';
import { UsersService } from '../shared/services/users/users.service';
import { SimpleModalComponent } from '../common-ui/simple-modal/simple-modal.component';
import { CompanyService } from '../shared/services/company/company.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActionsService } from '../shared/services/actions/actions.service';
import { HEADER_ANGULAR_WIDTH, HEADER_NESTJS_WIDTH } from '../shared/consts.ts';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, RouterLink, CommonModule, SimpleModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public angularWidth = HEADER_ANGULAR_WIDTH;
  public nestjsWidth = HEADER_NESTJS_WIDTH;
  public isVisible = false;

  public companyService = inject(CompanyService);
  public actionsService = inject(ActionsService);
  public authService = inject(AuthService);
  public usersService = inject(UsersService);
  public router: Router = inject(Router);

  public currentUser = this.authService.currentUser;

  constructor(public auth: Auth0Service, private toast: HotToastService) {
    if (localStorage.getItem('token')) this.authService.getMe();
  }
  ngOnInit() {
    this.auth.idTokenClaims$.subscribe((val) => {
      if (val) localStorage.setItem('token', val?.__raw as string);
      this.authService.getMe();
      this.router.navigate(['']);
    });
  }

  getUsers() {
    this.usersService.getUsers();
  }

  getAllCompanies() {
    this.companyService.getAll();
    this.actionsService.getAllActions();
  }

  signIn() {
    this.authService.isAuth.set(false);
  }

  logout() {
    this.authService.logout();
  }

  showModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }
}
