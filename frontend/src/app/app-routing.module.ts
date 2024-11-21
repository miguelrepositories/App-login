import { AuthGuard } from './guards/auth.guard';
import { NewPasswordComponent } from './views/components/new-password/new-password.component';
import { RecoverComponent } from './views/components/recover/recover.component';
import { SignupComponent } from './views/components/signup/signup.component';
import { LoginComponent } from './views/components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
    ],
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'recover', component: RecoverComponent },
      { path: 'new-password', component: NewPasswordComponent }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
