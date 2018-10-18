import { Component, OnInit } from '@angular/core';
import WebSocketAsPromised from 'websocket-as-promised';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {

  private wsp: WebSocketAsPromised
  constructor() {
    // websocket init
    this.wsp = new WebSocketAsPromised('ws://localhost:8000/ws/chat');
  }

  private message = {
    author: "tutorialMaster",
    message: "this is a message"
  }

  sendMsg(){
    // send message to websocket
    console.log('send message');
    this.wsp.open()
      .then(() => this.wsp.send({"message" : 'foo'}))
      .then(() => this.wsp.close())
      .catch(e => console.error(e));
  }

  ngOnInit() {
  }

}
