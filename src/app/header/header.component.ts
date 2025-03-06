import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { LogoComponent } from '../common-ui/logo/logo.component';
import { AuthService } from '../shared/services/auth/auth.service';
import { IUserResponse } from '../shared/interfaces';
import { UsersService } from '../shared/services/users/users.service';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public angularWidth = 40;
  public nestjsWidth = 50;

  public authService = inject(AuthService);
  public usersService = inject(UsersService);
  public router: Router = inject(Router);

  public currentUser = this.authService.currentUser;

  constructor(public auth: Auth0Service) {
    if (localStorage.getItem('token'))
      this.authService.getMe().subscribe((val) => {
        this.authService.currentUser.set(val as IUserResponse);
      });
  }
  ngOnInit() {
    this.auth.idTokenClaims$.subscribe((val) => {
      if (val) localStorage.setItem('token', val?.__raw as string);
      this.authService.getMe().subscribe((val) => {
        this.authService.currentUser.set(val as IUserResponse);
      });
      this.router.navigate(['']);
    });
  }

  getUsers() {
    this.usersService.getUsers();
  }

  signIn() {
    this.authService.isAuth.set(false);
  }

  logout() {
    this.authService.logout();
  }
}
