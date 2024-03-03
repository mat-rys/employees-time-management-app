import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  login() {
    const requestBody = {
      userEmail: this.email,
      userPassword: this.password,
    };
  
    this.http.post('http://localhost:8080/api/login', requestBody).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);

        const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));

        const userRole = tokenPayload['role'];
        if (userRole === 'USER') {
          this.router.navigate(['/time-managment']);
        } else if (userRole === 'ADMIN') {
          this.router.navigate(['/monitor-users']);
        }
      }
    );
  }


  navigateToRegistration() {
    this.router.navigate(['/registration']);
    console.log(this.authService.getToken)
  }
}

