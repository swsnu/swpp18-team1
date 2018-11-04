import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Channel } from '../model/channel';
import { Router } from '@angular/router';

const CHAT_URL = 'ws://echo.websocket.org/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

type Data = { room_name: string };

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private channelUrl = 'http://localhost:8000/api/channel';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  channel: Channel = null;
  manager_id: number = 10; //TODO: change

  create(title) {
    const { manager_id } = this
    return this.http.post<Data>(this.channelUrl, { title, manager_id }, httpOptions).toPromise() // turn Observable into Promise
  }
}
