import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth-config/auth.service';
import { Account } from './models/account.model';
import { Work } from '../../user/time-managment/models/work.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { MonitoringHttpService } from './services/monitoring-http.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-monitor-users',
  templateUrl: './monitor-users.component.html',
  styleUrls: ['./monitor-users.component.css']
})
export class MonitorUsersComponent implements OnInit {
  selectedUser!: number;
  users!: Account[];
  workHistory: Work[] = []; 
  startDate!: string;
  endDate!: string;
  totalDuration: string = '00:00:00'; 

  constructor(private authService: AuthService, private http: HttpClient, private monitoringService: MonitoringHttpService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.monitoringService.fetchUsers().subscribe((data) => {
      this.users = data;
    });
  }

  searchWorkHistory() {
    if (this.startDate && this.endDate) {
      this.fetchWorkHistory(this.selectedUser, this.startDate, this.endDate);
    }
  }

  onUserChange() {
  }

  fetchWorkHistory(userId: number, startDate: string, endDate: string) {
    if (this.monitoringService) {
      const workHistoryObservable = this.monitoringService.fetchWorkHistory(userId, startDate, endDate);
      if (workHistoryObservable) {
        workHistoryObservable.subscribe((data) => {
          if (data) {
            this.workHistory = data;
            this.calculateTotalDuration();
          }
        });
      } else {console.error('Observable workHistoryObservable jest niezdefiniowany.');}
    } else {console.error('Serwis monitorowania nie jest zdefiniowany.');}
  }
  
  

  formatWorkDate(dateString: string): string {
    const date = new Date(dateString);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  }

  calculateTotalDuration() {
    let totalMilliseconds = 0; 
  
    for (const work of this.workHistory) {
      const startDate = this.parseDateTime(`${work.startDate} ${work.startHour}`);
      const endDate = this.parseDateTime(`${work.endDate} ${work.endHour}`);
  
      if (startDate && endDate) {
        const timeDifference = endDate.getTime() - startDate.getTime();
        totalMilliseconds += timeDifference;
      }
    }
  
    const totalSeconds = totalMilliseconds / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
  
    this.totalDuration = `${hours}h ${minutes}m`;
  }
  
  parseDateTime(dateTimeStr: string): Date | null {
    const dateTimeParts = dateTimeStr.split(' ');
    const dateParts = dateTimeParts[0].split('-');
    const timeParts = dateTimeParts[1].split(':');

    if (dateParts.length === 3 && timeParts.length === 3) {
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const seconds = parseInt(timeParts[2]);

        return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
    }
    return null; 
}


  
calculateDuration(work: Work): string {
  if (!work.startHour) {
    return 'Brak godziny rozpoczęcia';
  }

  if (!work.endHour) {
    return 'Praca w toku';
  }

  console.log('startDate:', work.startDate);
  console.log('endDate:', work.endDate);

  const startDate = this.parseDateTime(`${work.startDate} ${work.startHour}`);
  const endDate = this.parseDateTime(`${work.endDate} ${work.endHour}`);

    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
  
    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      console.log('timeDifference:', timeDifference);
  
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      if (days > 0) {
        return `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    } else {
      return 'Nieprawidłowa data lub godzina';
    }
  }

  logout() {
    this.authService.removeToken();
  }

  calculateDurationPdf(work: Work): string {
    if (!work.startHour) {
      return 'Brak godziny rozpoczęcia';
    }
  
    if (!work.endHour) {
      return 'Praca w toku';
    }
  
    const startDate = this.parseDateTime(`${work.startDate} ${work.startHour}`);
    const endDate = this.parseDateTime(`${work.endDate} ${work.endHour}`);
    
    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
    
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    
      return `${hours}h ${minutes}m`;
    } else {
      return 'Nieprawidłowa data lub godzina';
    }
  }

  downloadWorkHistory(selectedUser: number) {
    let userData: Account | undefined; 
  
    this.monitoringService.downloadWorkHistory(selectedUser).subscribe((data) => {
      userData = data; 
      if (userData) { 
        const userEmail = userData.userEmail;
        const userSurname = userData.surname;
        const userName = userData.name;
        const position = userData.position;
  
        const docDefinition: TDocumentDefinitions = {
          content: [
            'Historia pracy',
            `Email: ${userEmail}`,
            `Imie: ${userName}`,
            `Nazwisko: ${userSurname}`,
            `Stanowisko: ${position}`,
            {
              table: {
                body: [
                  ['Stan', 'Data rozpoczęcia', 'Godzina rozpoczęcia', 'Data zakończenia', 'Godzina zakończenia', 'Czas trwania'],
                  ...this.workHistory.map(work => [
                    work.stage,
                    this.formatWorkDate(work.startDate),
                    work.startHour,
                    this.formatWorkDate(work.endDate),
                    work.endHour,
                    this.calculateDurationPdf(work)
                  ]),
                ],
              },
            },
            {
              text: `Ilość godzin przepracowanych w danym okresie: ${this.totalDuration}`,
              alignment: 'right',
              margin: [0, 10, 0, 0],
            },
          ],
        };
  
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        const fileName = `work_history_${userName}_${userSurname}.pdf`;
        pdfDocGenerator.download(fileName);
      } else {
        console.error('Dane użytkownika są niezdefiniowane.');
      }
    });
  }
  
  
}