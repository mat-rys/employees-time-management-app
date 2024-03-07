import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { StartPageComponent } from './start-page/start-page.component'; 
import { RegistrationComponent } from './registration/registration.component';
import { TimeManagmentComponent } from './user/time-managment/time-managment.component';
import { SettingsComponent } from './user/settings/settings.component';
import { MonitorUsersComponent } from './admin/monitor-users/monitor-users.component';
import { ActivationAccountComponent } from './admin/activation-account/activation-account.component';
import { WorkHistoryComponent } from './user/work-history/work-history.component';
import { AuthGuard } from './auth-config/auth.guar';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {path: 'start-page',component: StartPageComponent},
  {
    path: 'time-managment',
    component: TimeManagmentComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'history-work',
    component: WorkHistoryComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'monitor-users',
    component: MonitorUsersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'activation-account',
    component: ActivationAccountComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: '', redirectTo: 'start-page', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
