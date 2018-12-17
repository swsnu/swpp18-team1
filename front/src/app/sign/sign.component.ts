import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/service/user.service';

import { User } from 'src/model/user';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  user: User;

  constructor(
    public userService: UserService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.user = new User;
    this.userService.error = "";
  }

  ngAfterContentInit() {
      if(this.userService.isSignIn()) this.router.navigate([`main`])
  }

  signIn(ID: string, PW: string): void {
    if(ID && PW){
      this.user.username = ID;
      this.user.password = PW;
      this.userService.managerSignIn(this.user);
    }
  }
}
