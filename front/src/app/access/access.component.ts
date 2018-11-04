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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.channelHash = this.route.snapshot.params['hash'];
  }


  access(profile_picture: string, nickname: string): boolean {

    console.log('Input: ' + profile_picture + ', ' + nickname);
    console.log('channelHash: ' + this.channelHash);

    /*
    profile_picture = profile_picture.trim();
    nickname = nickname.trim();
    if(!profile_picture) { return; }
    if(!nickname) { return; }

    var is_manager = false;
    this.userService.createUser({is_manager, profile_picture, nickname} as Partial<User>)
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

    */
    return true;
  }
}
