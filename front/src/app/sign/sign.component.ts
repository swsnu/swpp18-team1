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
  error: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = new User;
    this.error = this.userService.error;
  }

  ngAfterContentInit() {
      if(this.userService.isSignIn()) this.router.navigate([`main`])
  }

  getToken(token): void {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    console.log(JSON.parse(window.atob(base64)));
  }

  signUp(ID: string, PW: string): void {
    this.user.username = ID;
    this.user.password = PW;
    this.userService.managerSignUp(this.user);
  }

  signIn(ID: string, PW: string): void {
    this.user.username = ID;
    this.user.password = PW;
    this.userService.managerSignIn(this.user);
  }

}
