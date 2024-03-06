import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-config/auth.service';
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

  constructor(private router: Router, private registrationService: RegistrationHttpService) {}

  register() {
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
}