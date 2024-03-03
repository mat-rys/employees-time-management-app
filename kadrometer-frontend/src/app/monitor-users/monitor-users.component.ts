import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Account } from './account.model';
import { Work } from '../time-managment/work.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

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



  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Account[]>('http://localhost:8080/account/get', { headers }).subscribe((data) => {
      this.users = data;
    });
  }

  searchWorkHistory() {
    this.fetchWorkHistory(this.selectedUser, () => {
        this.calculateTotalDuration();
    });
}

  onUserChange() {
  }

  fetchWorkHistory(userId: number, callback: () => void) {
    if (!this.startDate || !this.endDate) {

        console.error('Brak daty "od" lub "do".');
        return;
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    this.http.get<Work[]>(`http://localhost:8080/works/user/id/${userId}`, { headers }).subscribe((data) => {

        this.workHistory = data.filter((work) => {
            const workDate = new Date(work.startDate);
            return this.startDate <= workDate.toISOString() && workDate.toISOString() <= this.endDate;
        });
        console.log(this.workHistory);

        callback();
    });
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

  downloadWorkHistory() {
    const token = this.authService.getToken();
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      // Fetch user data from Spring
      this.http.get<Account>(`http://localhost:8080/account/${this.selectedUser}`, { headers }).subscribe(
        (userData) => {
          // Extract user email and surname
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
        },
        (error) => {
        }
      );
    }
  }


  
}
