// work-history.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth-config/auth.service';
import { Work } from '../models/work.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class WorkHistoryService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getWorkHistory() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Work[]>('http://localhost:8080/works/user/email', { headers });
  }

  getAccountDetails() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Account>('http://localhost:8080/account/UserPrincipal', { headers });
  }
}
