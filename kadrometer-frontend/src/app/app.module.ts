import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TimeManagmentComponent } from './time-managment/time-managment.component';
import { SettingsComponent } from './settings/settings.component';
import { ActivationAccountComponent } from './activation-account/activation-account.component';
import { MonitorUsersComponent } from './monitor-users/monitor-users.component';
import { WorkHistoryComponent } from './work-history/work-history.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LoginComponent,
    RegistrationComponent,
    TimeManagmentComponent,
    SettingsComponent,
    ActivationAccountComponent,
    MonitorUsersComponent,
    WorkHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
