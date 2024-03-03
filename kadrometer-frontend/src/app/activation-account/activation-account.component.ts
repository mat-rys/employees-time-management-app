import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './account.model';

@Component({
  selector: 'app-activation-account',
  templateUrl: './activation-account.component.html',
  styleUrls: ['./activation-account.component.css']
})
export class ActivationAccountComponent implements OnInit {
  usersWithNullRole: Account[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsersWithNullRole();
  }

  fetchUsersWithNullRole() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Account[]>('http://localhost:8080/account/usersWithNullRole', { headers }).subscribe((users) => {
      this.usersWithNullRole = users;
    });
  }

  activateAccount(accountId: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const confirmResult = window.confirm('Czy na pewno chcesz aktywować tego użytkownika?');
  
    if (confirmResult) {
      const updatedData = { role: 'USER' };
  
      this.http.put(`http://localhost:8080/account/${accountId}`, updatedData, { headers }).subscribe((response) => {
        this.fetchUsersWithNullRole();
      });
    }
  }

  confirmActivation(accountId: number) {
    const confirmResult = window.confirm('Czy na pewno chcesz aktywować tego użytkownika?');
    if (confirmResult) {
      this.activateAccount(accountId);
    }
  }

  confirmDelete(accountId: number) {
    const confirmResult = window.confirm('Czy na pewno chcesz usunąć to konto?');
  
    if (confirmResult) {
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      this.http.delete(`http://localhost:8080/account/${accountId}`, { headers }).subscribe((response) => {
        this.fetchUsersWithNullRole();
      });
    }
  }
  

  logout() {
    this.authService.removeToken();
  }
}

