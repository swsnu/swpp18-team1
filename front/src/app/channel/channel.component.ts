import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {

  constructor() {
    // websocket connect
  }

  private message = {
    author: "tutorialMaster",
    message: "this is a message"
  }

  sendMsg(){
    // send message to websocket
    console.log('new message from client to websocket: ', this.message);
    this.message.message = '';
  }

  ngOnInit() {
  }

}
