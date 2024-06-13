import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationHttpService } from './services/registration-http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = ''; 
  position: string = ''; 
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private router: Router, private registrationService: RegistrationHttpService) {}

  register() {
    if (!this.email || !this.password || !this.name || !this.surname || !this.position) {
      this.showError = true;
      this.errorMessage = 'Proszę uzupełnić wszystkie pola.';
      setTimeout(() => {
        this.showError = false;
        this.errorMessage = '';
      }, 5000);
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.showError = true;
      this.errorMessage = 'Nieprawidłowy email.';
      setTimeout(() => {
        this.showError = false;
        this.errorMessage = '';
      }, 5000);
      return;
    }

    const requestBody = {
      userEmail: this.email,
      userPassword: this.password,
      name: this.name, 
      surname: this.surname,
      position: this.position 
    };

    this.registrationService.register(requestBody).subscribe((response: any) => {
      this.router.navigate(['/login']);
    });
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
