import { Component, OnInit, Input } from '@angular/core';
import WebSocketAsPromised from 'websocket-as-promised';
import { Snippet } from 'src/model/snippet';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/service/user.service';


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
    private userService: UserService
  ) {
    const {room_name} = this.activeRoute.snapshot.params
    this.wsp = new WebSocketAsPromised(`ws://localhost:8000/ws/chat/${room_name}`);
  }

  sendMsg(){
    if(this.userService.isSignIn()) {
      if(this.wsp.isOpened){
        this.wsp.send(JSON.stringify({
        content: this.snippet.content,
        id: this.userService.user.username,
        }))
      } else {
      console.log('socket is not opened')
      }
    } else {
      console.log('user is empty')
    }
  }

  openDM(){
    console.log('======openDM=====')
  }

  ngOnInit() {
    if(this.userService.isSignIn()) {
      this.wsp.open()
        .then(() => {
          this.wsp.send(JSON.stringify({
            content: `${this.userService.user.username} 님이 입장하셨습니다.`,
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
      } else {
        console.log("User login is essential.")
      }
  }

  ngOnDestroy(){
    if(this.wsp.isOpened){
      this.wsp.close()
      console.log('socket is closed')
    }
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
