import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Work } from './work.model';
import { interval, Subscription } from 'rxjs'; 
import { WorkEnd } from './work.model copy';

@Component({
  selector: 'app-time-managment',
  templateUrl: './time-managment.component.html',
  styleUrls: ['./time-managment.component.css']
})
export class TimeManagmentComponent  implements OnInit {
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  isStart: boolean = true;
  workWithMissingEndHour!: Work; 
  timeDifference!: string;
  private subscription!: Subscription;


  ngOnInit() {
    this.fetchWorkWithMissingEndHour(); 
   
    this.subscription = interval(1000).subscribe(() => {
        this.calculateTimeDifference(); 
    });
  }  
  

  fetchWorkWithMissingEndHour() {
    const token = this.authService.getToken();
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      this.http.get<Work>('http://localhost:8080/works/missingEndHour', { headers }).subscribe((work) => {
        this.workWithMissingEndHour = work;
        console.log(work);
        this.calculateTimeDifference();
        
        if (work.endHour === null) {
          this.isStart = false;
        }
      });
    }
  }
  

  calculateTimeDifference() {
    if (this.workWithMissingEndHour && !this.workWithMissingEndHour.endHour) {
      const startDateTimeParts = this.workWithMissingEndHour.startHour.split(':');
      const startDateParts = this.workWithMissingEndHour.startDate.split('T')[0].split('-');

      const startDateTime = new Date(
          parseInt(startDateParts[0]), 
          parseInt(startDateParts[1]) - 1, 
          parseInt(startDateParts[2]),
          parseInt(startDateTimeParts[0]), 
          parseInt(startDateTimeParts[1]), 
          parseInt(startDateTimeParts[2])
      );

      const now = new Date();

      const timeDifferenceInSeconds = (now.getTime() - startDateTime.getTime()) / 1000;

      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
      const seconds = Math.floor(timeDifferenceInSeconds % 60);

      this.timeDifference = `${hours}h:${minutes}m:${seconds}s`;
    } else {
      this.timeDifference = "0h:0m:0s"; 
    }
  }

  toggleStartStop() {
    if (window.confirm('Czy na pewno chcesz ' + (this.isStart ? 'rozpocząć pracę?' : 'zakończyć pracę?'))) {
      console.log('Funkcja toggleStartStop została wywołana.');
      this.isStart = !this.isStart;
      if (!this.isStart) {
        const work: any = {
          startDate: new Date().toISOString().split('T')[0],
          stage: 'TRWA',
          startHour: new Date().toTimeString().split(' ')[0],
        };

        const token = this.authService.getToken();

        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          this.http.post('http://localhost:8080/works/post', work, { headers }).subscribe((response) => {
            console.log('Praca rozpoczęta.');
            this.fetchWorkWithMissingEndHour();
          });
        }
      } else {
        const workId = this.workWithMissingEndHour.workId;
        const now = new Date();

        const updatedWork: WorkEnd = {
          workId: this.workWithMissingEndHour.workId,
          stage: 'ZAKOŃCZONA',
          endDate: new Date().toISOString().split('T')[0],
          endHour: now.toTimeString().split(' ')[0]
        };
        console.log(updatedWork)
        
        const token = this.authService.getToken();

        if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          this.http.put(`http://localhost:8080/works/${workId}`, updatedWork, { headers }).subscribe((response) => {
            console.log('Praca zakończona.');
            this.fetchWorkWithMissingEndHour();
          });
        }
      }
    }
}
  logout() {
    this.authService.removeToken();
  }

}
