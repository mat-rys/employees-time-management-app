import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHttpService } from './services/login-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private loginService: LoginHttpService,
    private router: Router,
  ) {}

  login() {
    this.loginService.login(this.email, this.password);
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}
