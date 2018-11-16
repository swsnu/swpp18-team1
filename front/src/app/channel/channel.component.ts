import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import WebSocketAsPromised from 'websocket-as-promised';
import { Snippet } from 'src/model/snippet';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/service/user.service';
import { ChatService } from 'src/service/chat.service';
import { ChannelService } from 'src/service/channel.service';
import { WebsocketPacket } from 'src/model/websocket-packet';
import { EventType } from 'src/enums';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  //styleUrls: ['./channel.component.css']
})

export class ChannelComponent implements OnInit {

  snippet: Snippet = new Snippet
  snippets: Snippet[] = []
  
  channelTitle: string = "";

  private wsp: WebSocketAsPromised
  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService,
    private channelService: ChannelService,
    private router: Router,
    private location: Location,
  ) {}

  sendMsg(){
    if(this.snippet.content){
      let packet = new WebsocketPacket({event_type: EventType.SendChannelMessage, data: {content: this.snippet.content}})
      this.chatService.sendData(packet)
      this.snippet.content = ""
    }
  }

  openDM(){
    console.log('======openDM=====')
  }

  ngOnInit() {
    const {channel_hash} = this.activeRoute.snapshot.params

    this.channelService.getChannel(channel_hash)

    this.chatService.connect(channel_hash).then(() => {
      this.chatService.addEventListner((websocketPacket: WebsocketPacket) => {

        switch(websocketPacket.event_type) {
          case EventType.ReceiveChannelMessage: {
            const data = websocketPacket.data
            const delived_snippet = {sender_id: data["sender_id"], content: data["content"], username: data["username"]}
            this.snippets.push(delived_snippet)
          }
          case EventType.NewUserConnect: {
          }
        }

      })
    })
  }

  ngOnDestroy(){
    this.chatService.disconnect()
  }

  signOut(): void {
    const currentUser_id = this.userService.user.id
    const manager_id = this.channelService.channel.manager_id
    const { channel_hash } = this.activeRoute.snapshot.params

    if(currentUser_id == manager_id) {
      this.userService.managerSignOut();
    } else {
      this.userService.userSignOut(channel_hash);
    }
  }

  goBack(): void {
    this.location.back()
  }
}
