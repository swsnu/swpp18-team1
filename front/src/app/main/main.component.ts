import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { ChannelService } from 'src/service/channel.service';
import { Router } from '@angular/router';
import { Channel } from 'src/model/channel';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public Editor = ClassicEditor;
  public editorConfig = {
    language: 'ko',
    cloudServices: {
      tokenUrl: '',
      uploadUrl: ''
    },
  }

  manager: string = "";
  channel: Channel = new Channel({title: "", post: ""});
  channel_hash: number;
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

    this.getManager()
  }

  moveToChannel(channel_id) {
    this.router.navigate([`channel/${channel_id}`])
  }

  createChannel(): void {
    this.channelService.create(this.channel)
    .then(response => {
      this.channel_hash = response.id
      this.router.navigate([`channel/${this.channel_hash}`])
      }).catch(e => {
        console.log('Error: ', e)
      })
  }

  updateChannel(): void {
    this.channelService.update(this.channel).then(() => {
      window.alert("성공적으로 업데이트 했습니다.")
    }).catch((e) => {
      console.log("에러 : ", e.message)
    })
  }

  getManager(): void {
    this.manager = this.userService.user.username
  }

  signOut(): void {
    this.userService.managerSignOut();
  }

  moveToQR(): void {
    this.router.navigate([`qr`])
  }
}
