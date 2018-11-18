<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, Input } from '@angular/core';
>>>>>>> a856710f89849e36b86c3858ea4d0a320dbc5c1e
import { Location } from '@angular/common';
import { ChannelMessage } from 'src/model/channel-message';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/service/user.service';
import { ChatService } from 'src/service/chat.service';
import { ChannelService } from 'src/service/channel.service';
import { WebsocketPacket } from 'src/model/websocket-packet';
import { EventType } from 'src/enums';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})

export class ChannelComponent implements OnInit {

  channelTitle: string = ""
<<<<<<< HEAD
  channelPost: Text
=======
>>>>>>> a856710f89849e36b86c3858ea4d0a320dbc5c1e
  channelMessage: ChannelMessage = new ChannelMessage()
  channelMessages: ChannelMessage[] = []
  managerOrNot: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService,
    private channelService: ChannelService,
    private location: Location,
  ) {}

  sendMsg(){
    if(this.channelMessage.content){
      let packet = new WebsocketPacket({event_type: EventType.SendChannelMessage, data: {content: this.channelMessage.content}})
      this.chatService.sendData(packet)
      this.channelMessage.content = ""
    }
  }

  openDM(){
    console.log('======openDM=====')
  }

  ngOnInit() {
    const {channel_hash} = this.activeRoute.snapshot.params

    this.channelService.getChannel(channel_hash).then((channel) => {
      this.channelTitle = channel.title
<<<<<<< HEAD
      this.channelPost = channel.post
=======
      if(channel.manager_id == this.userService.user.id) {
        this.managerOrNot = true;
      }
>>>>>>> a856710f89849e36b86c3858ea4d0a320dbc5c1e
    })
    this.channelService.getChannelMessage(channel_hash).then((messages) => {
      this.channelMessages = messages.map((message) => new ChannelMessage(message))
    })
    this.chatService.connect(channel_hash).then(() => {
      this.chatService.addEventListner((websocketPacket: WebsocketPacket) => {
        switch(+websocketPacket.event_type) {
          case EventType.ReceiveChannelMessage: {
            const newMessage = new ChannelMessage(websocketPacket.data)
            this.channelMessages.push(newMessage)
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
