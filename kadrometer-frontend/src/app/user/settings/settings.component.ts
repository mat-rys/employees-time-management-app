import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-config/auth.service';
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

  updateAccount(accountId: number, field: string, newValue: string) {
    if (newValue) {
      let updateData: Record<string, any> = {};
      updateData[field] = newValue;
      this.settingsService.updateAccount(accountId, updateData).subscribe(() => {
        this.loadUserAccount();
        this.resetField(field);
      });
    }
  }
  
  resetField(field: string) {
    switch (field) {
      case 'userEmail':
        this.showEmailInput = false;
        this.newEmail = '';
        break;
      case 'name':
        this.showNameInput = false;
        this.newName = '';
        break;
      case 'surname':
        this.showSurnameInput = false;
        this.newSurname = '';
        break;
      case 'position':
        this.showPositionInput = false;
        this.newPosition = '';
        break;
    }
  }
  
}