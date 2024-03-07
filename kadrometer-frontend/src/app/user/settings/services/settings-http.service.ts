import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth-config/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  loadUserAccount(): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get('http://localhost:8080/account/UserPrincipal', { headers });
    }
    return of(null);
  }

  updateAccount(accountId: number, updateData: any): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put(`http://localhost:8080/account/${accountId}`, updateData, { headers });
    }
    return of(null);
  }
}
