import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/service/channel.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {

  constructor(
    private channelService: ChannelService,
  ) { }

  private channelUrl=''

  ngOnInit() {
    const id = this.channelService.channel && this.channelService.channel.id
    this.channelUrl = `localhost:4200/access/${id}`
  }
}
