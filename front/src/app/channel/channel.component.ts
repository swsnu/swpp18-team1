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
    if(this.wsp.isOpened){
      console.log('socket is opened');
      this.wsp.send(this.message.message)
    } else {
      console.log('socket is not opened');
    }
  }

  ngOnInit() {
    this.wsp.open()
      .then(() => {
        this.wsp.onMessage.addListener(message => console.log(message));
      })
      .catch(e => console.error(e))
  }

  ngOnDestroy(){
    if(this.wsp.isOpened){
      this.wsp.close()
    }
  }

}
