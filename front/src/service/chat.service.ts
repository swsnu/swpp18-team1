import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Channel } from '../model/channel';
import { Router } from '@angular/router';
import WebSocketAsPromised from 'websocket-as-promised';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private websoketUrl = 'ws://localhost:8000/ws/chat'
  private wsp: WebSocketAsPromised

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  connect(room_name: string){
    this.wsp = new WebSocketAsPromised(this.websoketUrl + room_name)
    this.wsp.open().then(() => {
      console.log('websoket is opened')
    })
  }

  addEventListner(listner: (msg: string) => void) : void{
    if(this.wsp.isOpened && listner){
      // @ts-ignore
      this.wsp.onMessage.addListener(msg => {
        listner(msg);
      })
    }
  }

  sendData(data: object) : void{
    if(this.wsp.isOpened){
      this.wsp.send(JSON.stringify(data))
    } else {
      console.log('socket is not opened')
    }
  }

  disconnect() : void{
    if(this.wsp.isOpened){
      this.wsp.close()
      console.log('socket is closed')
    }
  }

}
