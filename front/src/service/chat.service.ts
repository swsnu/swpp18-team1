import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Channel } from '../model/channel';
import { Router } from '@angular/router';
import { UserService } from './user.service';

const CHAT_URL = 'ws://echo.websocket.org/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

type Data = { id: number };

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private channelUrl = '/api/channel';
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) { }

  channel: Channel = null;

  create(title) {
    const manager_id = this.userService.user.id
    const httpOptionsWithToken = {
      headers: httpOptions.headers.append('AUTHORIZATION', 'Bearer ' + this.userService.token)
    }
    return this.http.post<Data>(this.channelUrl, {
      title, manager_id,
      // 'HTTP_AUTHORIZATION': this.userService.token,
    }, httpOptionsWithToken).toPromise() // turn Observable into Promise
  }
}
