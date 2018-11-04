import { Component, OnInit, Input } from '@angular/core';
import WebSocketAsPromised from 'websocket-as-promised';
import { Snippet } from '../model/snippet';
import shortid from 'shortid'

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  //styleUrls: ['./channel.component.css']
})

export class ChannelComponent implements OnInit {

  snippet: Snippet = new Snippet
  snippets: Snippet[] = []
  id: string

  private wsp: WebSocketAsPromised
  constructor() {
    // websocket init
    this.wsp = new WebSocketAsPromised('ws://localhost:8000/ws/chat/test');
  }

  sendMsg(){
    // send message to websocket
    if(this.wsp.isOpened){
      this.wsp.send(JSON.stringify({
        content: this.snippet.content,
        id: this.id,
      }))
    } else {
      console.log('socket is not opened')
    }
  }

  openDM(){
    console.log('======openDM=====')
  }

  ngOnInit() {
    this.id = shortid.generate()
    this.wsp.open()
      .then(() => {
        this.wsp.send(JSON.stringify({
          content: `${this.id} 님이 입장하셨습니다.`,
          id: 'notification',
        }))
        // @ts-ignore
        this.wsp.onMessage.addListener(msg => {
          if(msg){
            const json_msg = JSON.parse(msg)
            const { id, content } = json_msg
            // TODO: add snippetable_id & type
            const delived_snippet = { user_id: id, content }
            // @ts-ignore
            this.snippets.push(delived_snippet)
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
