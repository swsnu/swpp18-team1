import { Injectable } from '@angular/core';

const CHAT_URL = 'ws://echo.websocket.org/';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }
}
