import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth-config/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivationHttpService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchUsersWithNullRole(): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get('http://localhost:8080/account/usersWithNullRole', { headers });
    }
    return of(null);
  }

  activateAccount(accountId: number, updatedData: any): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put(`http://localhost:8080/account/${accountId}`, updatedData, { headers });
    }
    return of(null);
  }

  deleteAccount(accountId: number): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete(`http://localhost:8080/account/${accountId}`, { headers });
    }
    return of(null);
  }
}
