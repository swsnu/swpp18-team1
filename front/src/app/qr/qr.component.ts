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
    const id = this.channelService.channel && this.channelService.channel.id
    const url = window.location.href.replace('/qr', `/access/${id}`)
    this.channelUrl = url
  }

  goBack(): void {
    this.location.back()
  }
}
