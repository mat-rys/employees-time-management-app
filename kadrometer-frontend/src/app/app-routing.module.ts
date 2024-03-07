import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { StartPageComponent } from './start-page/start-page.component'; 
import { RegistrationComponent } from './registration/registration.component';
import { MonitorUsersComponent } from './admin/monitor-users/monitor-users.component';
import { ActivationAccountComponent } from './admin/activation-account/activation-account.component';
import { AuthGuard } from './auth-config/auth.guar';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'registration', component: RegistrationComponent },
  {path: 'start-page',component: StartPageComponent},
  {path: '', redirectTo: 'start-page', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
