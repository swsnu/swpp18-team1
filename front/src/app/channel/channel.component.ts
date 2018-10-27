import { Component, OnInit, Input } from '@angular/core';
import WebSocketAsPromised from 'websocket-as-promised';
import { Snippet } from '../model/snippet';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {

  @Input() snippet: Snippet = new Snippet
  snippets: Snippet[] = []

  private wsp: WebSocketAsPromised
  constructor() {
    // websocket init
    this.wsp = new WebSocketAsPromised('ws://localhost:8000/ws/chat/test');
  }

  sendMsg(){
    // send message to websocket
    if(this.wsp.isOpened){
      this.wsp.send(JSON.stringify({
        'message': this.snippet.content
      }))
    } else {
      console.log('socket is not opened')
    }
  }

  ngOnInit() {
    this.wsp.open()
      .then(() => {
        this.wsp.onMessage.addListener(msg => {
          if(msg){
            let delivered_snippet : Snippet = new Snippet
            let json_msg = JSON.parse(msg)
            delivered_snippet.content = json_msg.message
            this.snippets.push(delivered_snippet)
          }
          console.log("get Message from back : " +  msg)
        });
      })
      .catch(e => console.error(e))
  }

  ngOnDestroy(){
    if(this.wsp.isOpened){
      this.wsp.close()
      console.log('socket is closed')
    }
  }

}
