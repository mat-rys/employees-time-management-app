import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

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

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  register() {
    const requestBody = {
      userEmail: this.email,
      userPassword: this.password,
      name: this.name, 
      surname: this.surname,
      position: this.position 
    };

    this.http.post('http://localhost:8080/api/register', requestBody).subscribe((response: any) => {
      this.router.navigate(['/login']);
    });
  }
}
