import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-config/auth.service';
import { Work } from './models/work.model';
import { interval, Subscription } from 'rxjs'; 
import { WorkEnd } from './models/work-end.model';
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

  async ngOnInit() {
    await this.fetchWorkWithMissingEndHour(); 
    this.subscription = interval(1000).subscribe(() => {this.calculateTimeDifference(); });
  }   

  private async fetchWorkWithMissingEndHour() {
    const work = await this.timeService.fetchWorkWithMissingEndHour().toPromise();
    this.workWithMissingEndHour = work;
    this.calculateTimeDifference();
    if (work.endHour === null) {
      this.isStart = false;
    }
  }

  private calculateTimeDifference() {
    if (this.workWithMissingEndHour && !this.workWithMissingEndHour.endHour) {
      const datePart = this.workWithMissingEndHour.startDate.split('T')[0];
      const startDateTime = Date.parse(datePart + 'T' + this.workWithMissingEndHour.startHour);

      const now = new Date();
      const timeDifferenceInSeconds = (now.getTime() - startDateTime) / 1000;

      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
      const seconds = Math.floor(timeDifferenceInSeconds % 60);
      this.timeDifference = `${hours}h:${minutes}m:${seconds}s`;
    } else {
      this.timeDifference = "0h:0m:0s"; 
    }

  }

  async toggleStartStop() {
    if (window.confirm('Czy na pewno chcesz ' + (this.isStart ? 'rozpocząć pracę?' : 'zakończyć pracę?'))) {
      this.isStart = !this.isStart;
      if (!this.isStart) {
        const work: any = {
          startDate: new Date().toISOString().split('T')[0],
          stage: 'TRWA',
          startHour: new Date().toTimeString().split(' ')[0],
        };

        await this.timeService.startWork(work).toPromise();
        await this.fetchWorkWithMissingEndHour();
      } else {
        const workId = this.workWithMissingEndHour.workId.toString();
        const now = new Date();

        const updatedWork: WorkEnd = {
          workId: this.workWithMissingEndHour.workId,
          stage: 'ZAKOŃCZONA',
          endDate: new Date().toISOString().split('T')[0],
          endHour: now.toTimeString().split(' ')[0]
        };
        
        await this.timeService.endWork(workId, updatedWork).toPromise();
        await this.fetchWorkWithMissingEndHour();
      }
    }
  }

  logout() {
    this.authService.removeToken();
  }
}