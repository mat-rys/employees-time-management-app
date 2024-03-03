import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './account.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  account: any = {};
  accountData: any = {};
  showEmailInput = false;
  newEmail = '';
  showNameInput = false;
  newName = '';
  showSurnameInput = false;
  newSurname = '';
  showPositionInput = false;
  newPosition = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } 
   
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.loadUserAccount(headers);
  }

  loadUserAccount(headers: HttpHeaders) {
    this.http.get<Account>('http://localhost:8080/account/UserPrincipal', { headers })
      .subscribe(data => {
        this.account = data;
      });
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  updateEmail(accountId: number) {
    if (this.newEmail) {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http
          .put(`http://localhost:8080/account/${accountId}`, { userEmail: this.newEmail }, { headers })
          .subscribe(() => {
            this.loadUserAccount(headers);
            this.showEmailInput = false;
            this.newEmail = '';
          });
      }
    }
  }

  updateName(accountId: number) {
    if (this.newName) {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http
          .put(`http://localhost:8080/account/${accountId}`, { name: this.newName }, { headers })
          .subscribe(() => {
            this.loadUserAccount(headers);
            this.showNameInput = false;
            this.newName = '';
          });
      }
    }
  }

  updateSurname(accountId: number) {
    if (this.newSurname) {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http
          .put(`http://localhost:8080/account/${accountId}`, { surname: this.newSurname }, { headers })
          .subscribe(() => {
            this.loadUserAccount(headers);
            this.showSurnameInput = false;
            this.newSurname = '';
          });
      }
    }
  }

  updatePosition(accountId: number) {
    if (this.newPosition) {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http
          .put(`http://localhost:8080/account/${accountId}`, { position: this.newPosition }, { headers })
          .subscribe(() => {
            this.loadUserAccount(headers);
            this.showPositionInput = false;
            this.newPosition = '';
          });
      }
    }
  }
}