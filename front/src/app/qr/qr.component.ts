import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/service/channel.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {

  constructor(
    private channelService: ChannelService,
    private router: Router,
    private location: Location,
  ) { }

  channelUrl=''

  ngOnInit() {
    const channel_hash = this.channelService.channel && this.channelService.channel.channel_hash
    const url = window.location.href.replace('/qr', `/access/${channel_hash}`)
    this.channelUrl = url
  }

  goBack(): void {
    this.location.back()
  }
}
