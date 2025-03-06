import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { LogoComponent } from '../common-ui/logo/logo.component';
import { AuthService } from '../shared/services/auth/auth.service';
import { IUserInfo } from '../shared/interfaces';
import { UsersService } from '../shared/services/users/users.service';
import { SimpleModalComponent } from '../common-ui/simple-modal/simple-modal.component';
import { CompanyService } from '../shared/services/company/company.service';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, RouterLink, CommonModule, SimpleModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public angularWidth = 40;
  public nestjsWidth = 50;
  public isVisible = false;

  public companyService = inject(CompanyService);
  public authService = inject(AuthService);
  public usersService = inject(UsersService);
  public router: Router = inject(Router);

  public currentUser = this.authService.currentUser;

  constructor(public auth: Auth0Service, private toast: HotToastService) {
    if (localStorage.getItem('token'))
      this.authService.getMe().subscribe((val) => {
        this.authService.currentUser.set(val.detail as IUserInfo);
      });
  }
  ngOnInit() {
    this.auth.idTokenClaims$.subscribe((val) => {
      if (val) localStorage.setItem('token', val?.__raw as string);
      this.authService.getMe().subscribe((val) => {
        this.authService.currentUser.set(val.detail as IUserInfo);
      });
      this.router.navigate(['']);
    });
  }

  getUsers() {
    this.usersService.getUsers().pipe(
      catchError((err) => {
        return throwError(() => {
          this.toast.error(err.error.message ? err.error.message : 'ERROR');
        });
      })
    );
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
