import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ActivationAccountComponent } from './admin/activation-account/activation-account.component';
import { MonitorUsersComponent } from './admin/monitor-users/monitor-users.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LoginComponent,
    RegistrationComponent,
    ActivationAccountComponent,
    MonitorUsersComponent,
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
