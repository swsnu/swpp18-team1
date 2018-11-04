import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user';


@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  new: User;
  users: User[] = [];
  channelHash: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.channelHash = this.route.snapshot.params['hash'];
  }

  access(image: string, nickname: string): boolean {

    console.log('Input: ' + image + ', ' + nickname);
    console.log('channelHash: ' + this.channelHash);

    image = image.trim();
    nickname = nickname.trim();
    if(!image) { return; }
    if(!nickname) { return; }

    this.userService.createUser({image, nickname} as Partial<User>)
      .then(user => {
          this.new= user;
          this.users.push(user);
          // this.router.navigate([`/user/${user.id}`]);
      });

    if(this.userService.getUser(this.new.id)) {
      return true;
    } else {
      return false;
    }
  }
}
