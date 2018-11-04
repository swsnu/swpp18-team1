<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, Input } from '@angular/core';
import WebSocketAsPromised from 'websocket-as-promised';
import { Snippet } from '../model/snippet';
import shortid from 'shortid'
>>>>>>> bc133e20cdb2d6eb1c4857fb5e3ecb604f1e9814

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
<<<<<<< HEAD
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
=======
  styleUrls: ['./channel.component.css'],
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
>>>>>>> bc133e20cdb2d6eb1c4857fb5e3ecb604f1e9814
  }

}
