import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../service/user.service';
import { ChannelService } from 'src/service/channel.service';
import { User } from '../../model/user';


@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  channelHash: number;

  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.channelHash = this.route.snapshot.params['hash'];
    this.channelService.getChannel(this.channelHash);
  }

  access(image: string, username: string): boolean {

    image = image.trim();
    username = username.trim();
    if(!image) { return; }
    if(!username) { return; }

    this.userService.createUser(this.channelHash, {image, username} as Partial<User>)
      .then(() => {
          this.router.navigate([`/channel/${this.channelHash}`]);
      });
  }
}
