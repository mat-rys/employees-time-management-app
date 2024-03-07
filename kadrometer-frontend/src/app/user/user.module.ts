import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { TimeManagmentComponent } from './time-managment/time-managment.component';
import { SettingsComponent } from './settings/settings.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';

const routes: Routes = [
  { path: 'history-work', component: WorkHistoryComponent },
  { path: 'time-managment', component: TimeManagmentComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  declarations: [WorkHistoryComponent, TimeManagmentComponent, SettingsComponent, NavbarUserComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [WorkHistoryComponent,TimeManagmentComponent,SettingsComponent], 
})
export class UserModule {}
