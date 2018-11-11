import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/service/chat.service';
import { UserService } from 'src/service/user.service';
import { Router } from '@angular/router';
import { Channel } from 'src/model/channel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private router: Router,
  ) { }
  title: string;
  room_name: number;
  channel: Channel;

  ngOnInit() {
    const manager_id = this.userService.user.id;
    this.userService.getChannel(manager_id)
      .then((channel) => {
        this.channel = channel
      })
  }
  moveToChannel(channel_id) {
    this.router.navigate([`channel/${channel_id}`])
  }

  handleGenerate() {
    this.chatService.create(this.title)
      .then(res => {
        const { id } = res //TODO: send room_name , not id
        this.room_name = id
        this.router.navigate([`channel/${this.room_name}`])
      }).catch(err => {
        console.log('err:', err)
      })
  }

  signOut(): void {
    this.userService.managerSignOut();
  }
}
