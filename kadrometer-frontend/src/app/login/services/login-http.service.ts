import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth-config/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    const requestBody = {
      userEmail: email,
      userPassword: password,
    };

    return this.http.post(environment.api.login, requestBody).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  handleLoginResponse(response: any) {
    this.authService.setToken(response.token);

    const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
    const userRole = tokenPayload['role'];

    if (userRole === 'USER') {
      this.router.navigate(['user/time-managment']);
    } else if (userRole === 'ADMIN') {
      this.router.navigate(['/admin/monitor-users']);
    }
  }
}
