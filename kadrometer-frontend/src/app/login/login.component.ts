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
  errorMessage: string = '';
  showError: boolean = false;
  
  constructor(
    private loginService: LoginHttpService,
    private router: Router,
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.showError = true;
      this.errorMessage = 'Proszę uzupełnić wszystkie pola.';
      setTimeout(() => {
        this.showError = false;
        this.errorMessage = '';
      }, 5000);
      return;
    }

    this.loginService.login(this.email, this.password).subscribe(
      (response: any) => {
        this.loginService.handleLoginResponse(response);
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = 'Nieprawidłowy email lub hasło.';
        setTimeout(() => {
          this.showError = false;
          this.errorMessage = '';
        }, 5000);
      }
    );
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}
