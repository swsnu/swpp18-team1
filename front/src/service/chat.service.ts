import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Channel } from '../model/channel';
import { Router } from '@angular/router';
import { UserService } from 'src/service/user.service';
import { environment } from 'src/environments/environment'
import { WebsocketPacket } from 'src/model/websocket-packet';

import WebSocketAsPromised from 'websocket-as-promised';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private websoketUrl = `ws://${environment.socketEndpoint}/ws/chat/:channel_hash/token/:token`
  private wsp: WebSocketAsPromised

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
  ) { }

  connect(channel_hash: string): Promise<Event>{
    const wsUrlWithToken = this.websoketUrl.replace(":channel_hash", channel_hash).replace(":token", this.userService.token)
    this.wsp = new WebSocketAsPromised(wsUrlWithToken)
    return this.wsp.open()
  }

  addEventListner(listner: (websocketPacket: WebsocketPacket) => void) : void{
    if(this.wsp.isOpened){
      // @ts-ignore
      this.wsp.onMessage.addListener(rawPacket => {
        const jsonPacket = JSON.parse(rawPacket)
        const packet = new WebsocketPacket({event_type: jsonPacket["event_type"], data: jsonPacket["data"], status_code: jsonPacket["status_code"]})
        listner(packet);
      })
    } else {
      console.log("socket is not opened")
    }
  }

  sendData(packet: WebsocketPacket) : void{
    if(this.wsp.isOpened){
      this.wsp.send(packet.toJson())
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
