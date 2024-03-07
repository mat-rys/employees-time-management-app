import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth-config/auth.service';
import { Observable, of } from 'rxjs'; 
import { Work } from '../models/work.model';
import { WorkEnd } from '../models/work-end.model';

@Injectable({
  providedIn: 'root'
})
export class TimeManagmentService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchWorkWithMissingEndHour(): Observable<any> {
    const token = this.authService.getToken();
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.get<Work>('http://localhost:8080/works/missingEndHour', { headers });
    }
    return of(null);
  }

  startWork(work: any): Observable<any> {
    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.post('http://localhost:8080/works/post', work, { headers });
    }
    return of(null);
  }

  endWork(workId: string, updatedWork: WorkEnd): Observable<any> {
    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.put(`http://localhost:8080/works/${workId}`, updatedWork, { headers });
    }
    return of(null);
  }
}
