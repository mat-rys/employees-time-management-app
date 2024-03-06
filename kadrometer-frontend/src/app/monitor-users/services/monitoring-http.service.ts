import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth-config/auth.service';
import { Account } from '../models/account.model';
import { Work } from '../../time-managment/models/work.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoringHttpService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  fetchUsers() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Account[]>('http://localhost:8080/account/get', { headers });
  }

  fetchWorkHistory(userId: number, startDate: string, endDate: string) {
    if (!startDate || !endDate) {
      console.error('Brak daty "od" lub "do".');
      return;
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Work[]>(`http://localhost:8080/works/user/id/${userId}`, { headers });
  }

  downloadWorkHistory(selectedUser: number): Observable<Account | undefined> {
    const token = this.authService.getToken();
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Account>(`http://localhost:8080/account/${selectedUser}`, { headers });
    }
    return of(undefined);
  }
}
