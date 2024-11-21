import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/components/login/login.component';
import { SignupComponent } from './views/components/signup/signup.component';
import { RecoverComponent } from './views/components/recover/recover.component';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './views/components/new-password/new-password.component';
import { HomeComponent } from './views/components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthGuard } from './guards/auth.guard';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RecoverComponent,
    NewPasswordComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [httpInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
