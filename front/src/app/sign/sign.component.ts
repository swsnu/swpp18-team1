import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/service/user.service';

import { User } from 'src/model/user';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  user: User;
  users: User[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = new User;
  }

  getToken(token): void {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    console.log(JSON.parse(window.atob(base64)));
  }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => this.users = users);
  }

  getUser(id: number): void {
    this.userService.getUser(id)
      .then(user => this.user = user);
  }

  signIn(ID: string, password: string): void {
    this.user.username = ID;
    this.user.password = password;
    this.userService.managerSignIn(this.user);
  }
}

