import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    const resp = this.loginService.logout();
    if(resp){
      this.router.navigate(['login']);
    }
  }

}
