import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    private router: Router,
  ) { }

  title: string;
  room_name: string = '';

  ngOnInit() {
  }

  moveToChannel() {
      this.router.navigate([`channel/${this.room_name}`])
  }

  handleGenerate() {
    this.chatService.create(this.title)
    .then(res => {
      const { room_name } = res
      this.room_name = room_name
      // this.router.navigate([`channel/${room_name}`])
    }).catch(err => {
      console.log('err:', err)
    })
  }
}
