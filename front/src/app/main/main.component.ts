import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { ChannelService } from 'src/service/channel.service';
import { Router } from '@angular/router';
import { Channel } from 'src/model/channel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  title: string;
  post: Text;
  room_name: number;
  channel: Channel;
  channel_exist: boolean = true;
  post_exist: boolean = false;

  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.channelService.getChannelByManager()
      .then(channel => {
        if(channel.id) {
          this.channel = channel;
        } else {
          this.channel_exist = false;
        }
      })
      .catch(() => {
        this.channel_exist = false;
      });
  }

  moveToChannel(channel_id) {
    this.router.navigate([`channel/${channel_id}`])
  }

  createChannel(): void {
    this.channelService.create(this.title)
      .then(response => {
        const { id } = response.id //TODO: send room_name , not id
        this.room_name = id
        this.router.navigate([`channel/${this.room_name}`])
      }).catch(e => {
        console.log('Error: ', e)
      })
  }

  createPost(post: Text): void {
    this.post = post;
  }

  signOut(): void {
    this.userService.managerSignOut();
  }

  moveToQR(): void {
    this.router.navigate([`qr`])
  }
}
