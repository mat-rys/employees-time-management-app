import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationHttpService {
  constructor(private http: HttpClient) { }

  register(userDetails: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/register', userDetails);
  }
}
