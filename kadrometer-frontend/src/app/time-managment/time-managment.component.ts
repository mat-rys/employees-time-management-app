import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-config/auth.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Work } from './models/work.model';
import { interval, Subscription } from 'rxjs'; 
import { WorkEnd } from './models/work-end.model';
import { Time } from '@angular/common';
import { TimeManagmentService } from './services/time-managment.service';

@Component({
  selector: 'app-time-managment',
  templateUrl: './time-managment.component.html',
  styleUrls: ['./time-managment.component.css']
})
export class TimeManagmentComponent  implements OnInit {
  constructor(private authService: AuthService, private timeService: TimeManagmentService) {}
  isStart: boolean = true;
  workWithMissingEndHour!: Work; 
  timeDifference!: string;
  private subscription!: Subscription;


  ngOnInit() {
    this.fetchWorkWithMissingEndHour(); 
    this.subscription = interval(1000).subscribe(() => {this.calculateTimeDifference(); });
  }   
  

  fetchWorkWithMissingEndHour() {
    this.timeService.fetchWorkWithMissingEndHour().subscribe((work) => {
      this.workWithMissingEndHour = work;
      console.log(work);
      this.calculateTimeDifference();
      
      if (work.endHour === null) {
        this.isStart = false;
      }
    });
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

        this.timeService.startWork(work).subscribe((response) => {
          console.log('Praca rozpoczęta.');
          this.fetchWorkWithMissingEndHour();
        });
      } else {
        const workId = this.workWithMissingEndHour.workId.toString(); // Konwersja na string
        const now = new Date();

        const updatedWork: WorkEnd = {
          workId: this.workWithMissingEndHour.workId,
          stage: 'ZAKOŃCZONA',
          endDate: new Date().toISOString().split('T')[0],
          endHour: now.toTimeString().split(' ')[0]
        };
        console.log(updatedWork)
        
        this.timeService.endWork(workId, updatedWork).subscribe((response) => {
          console.log('Praca zakończona.');
          this.fetchWorkWithMissingEndHour();
        });
      }
    }
  }


  logout() {
    this.authService.removeToken();
  }
}
