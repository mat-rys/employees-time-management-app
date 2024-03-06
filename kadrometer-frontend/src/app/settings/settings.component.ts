import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-config/auth.service';
import { Router } from '@angular/router';
import { SettingsHttpService } from './services/settings-http.service';

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
    private settingsService: SettingsHttpService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } 
    this.loadUserAccount();
  }

  loadUserAccount() {
    this.settingsService.loadUserAccount().subscribe(data => {
      this.account = data;
    });
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  updateEmail(accountId: number) {
    if (this.newEmail) {
      this.settingsService.updateAccount(accountId, { userEmail: this.newEmail }).subscribe(() => {
        this.loadUserAccount();
        this.showEmailInput = false;
        this.newEmail = '';
      });
    }
  }

  updateName(accountId: number) {
    if (this.newName) {
      this.settingsService.updateAccount(accountId, { name: this.newName }).subscribe(() => {
        this.loadUserAccount();
        this.showNameInput = false;
        this.newName = '';
      });
    }
  }

  updateSurname(accountId: number) {
    if (this.newSurname) {
      this.settingsService.updateAccount(accountId, { surname: this.newSurname }).subscribe(() => {
        this.loadUserAccount();
        this.showSurnameInput = false;
        this.newSurname = '';
      });
    }
  }

  updatePosition(accountId: number) {
    if (this.newPosition) {
      this.settingsService.updateAccount(accountId, { position: this.newPosition }).subscribe(() => {
        this.loadUserAccount();
        this.showPositionInput = false;
        this.newPosition = '';
      });
    }
  }
}