import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth-config/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const requestBody = {
      userEmail: email,
      userPassword: password,
    };

    this.http.post('http://localhost:8080/api/login', requestBody).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);

        const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));

        const userRole = tokenPayload['role'];
        if (userRole === 'USER') {
          this.router.navigate(['user/time-managment']);
        } else if (userRole === 'ADMIN') {
          this.router.navigate(['/admin/monitor-users']);
        }
      }
    );
  }
}
