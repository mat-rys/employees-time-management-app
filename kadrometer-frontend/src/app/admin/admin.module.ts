import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { MonitorUsersComponent } from './monitor-users/monitor-users.component';
import { ActivationAccountComponent } from './activation-account/activation-account.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';


const routes: Routes = [
  { path: 'monitor-users', component: MonitorUsersComponent },
  { path: 'activation-account', component: ActivationAccountComponent },
];

@NgModule({
  declarations: [MonitorUsersComponent, ActivationAccountComponent, NavbarAdminComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [MonitorUsersComponent, ActivationAccountComponent], 
})
export class AdminModule {}
