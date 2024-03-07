import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-config/auth.service';
import { Account } from './models/account.model';
import { ActivationHttpService } from './services/activation-http.service';

@Component({
  selector: 'app-activation-account',
  templateUrl: './activation-account.component.html',
  styleUrls: ['./activation-account.component.css']
})
export class ActivationAccountComponent implements OnInit {
  usersWithNullRole: Account[] = [];
  constructor(private authService: AuthService, private activationService: ActivationHttpService) {}

  ngOnInit() {
    this.fetchUsersWithNullRole();
  }

  fetchUsersWithNullRole() {
    this.activationService.fetchUsersWithNullRole().subscribe((users) => {
      this.usersWithNullRole = users;
    });
  }

  activateAccount(accountId: number) {
    const confirmResult = window.confirm('Czy na pewno chcesz aktywować tego użytkownika?');
  
    if (confirmResult) {
      const updatedData = { role: 'USER' };
  
      this.activationService.activateAccount(accountId, updatedData).subscribe(() => {
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
      this.activationService.deleteAccount(accountId).subscribe(() => {
        this.fetchUsersWithNullRole();
      });
    }
  }
  

  logout() {
    this.authService.removeToken();
  }
}