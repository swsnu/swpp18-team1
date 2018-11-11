import { Component, OnInit, Input } from '@angular/core';
import WebSocketAsPromised from 'websocket-as-promised';
import { Snippet } from 'src/model/snippet';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/service/user.service';
import { ChatService } from 'src/service/chat.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  //styleUrls: ['./channel.component.css']
})

export class ChannelComponent implements OnInit {

  snippet: Snippet = new Snippet
  snippets: Snippet[] = []

  private wsp: WebSocketAsPromised
  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService,
  ) {
    const {room_name} = this.activeRoute.snapshot.params
    // TODO with token
    this.chatService.connect(room_name)
  }

  sendMsg(){
    this.chatService.sendData({
      content: this.snippet.content,
      id: this.userService.user.username,
    })
  }

  openDM(){
    console.log('======openDM=====')
  }

  ngOnInit() {
    this.chatService.addEventListner((msg: string) => {
      if(msg){
        const json_msg = JSON.parse(msg)
        const { id, content } = json_msg
        // TODO: add snippetable_id & type
        const delived_snippet = {user_id: id, content}
        this.snippets.push(delived_snippet)
      }
      console.log("get Message from back : " +  msg)
    })
  }

  ngOnDestroy(){
    this.chatService.disconnect()
  }

  signOut(): void {
    const user = this.userService.user;
    if(user.password) {
      this.userService.managerSignOut();
    } else {
      this.userService.userSignOut(1);
    }
  }

}
