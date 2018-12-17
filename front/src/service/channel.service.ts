import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

import { Channel } from '../model/channel';
import { ChannelMessage } from '../model/channel-message';
import { UserService } from 'src/service/user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelUrl: string = environment.apiUrl + '/api/channel';
  private managerChannelUrl: string = environment.apiUrl + '/api/manager/channel';

  channel: Channel;
  channelMessages: [ChannelService];

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  getChannel(channel_hash: string): Promise<Channel> {
    const url = `${this.channelUrl}/${channel_hash}`;
    return this.http.get<Channel>(url)
    .toPromise()
    .then(channel => {
      this.channel = channel
      return channel
    })
    .catch((e) => {
      this.router.navigate(['/404']);
      return null
    });
  }

  getChannelByManager(): Promise<Channel> {
    const url = environment.apiUrl + `/api/manager/channel`;
    return this.http.get<Channel>(url, this.userService.getAuthHeader())
    .toPromise()
    .then(channel => {
      this.channel = channel;
      return channel
    })
  }

  create(channel: Channel): Promise<Channel>{
    const data = {
      title: channel.title,
      post: channel.post,
    }
    return this.http.post<Channel>(this.channelUrl, data , this.userService.getAuthHeader()).toPromise()
    .then(channel =>{
      this.channel = channel // get id
      return channel
    })
  }

  update(channel: Channel): Promise<Channel>{
    const url = this.channelUrl + `/${channel.channel_hash}`
    return this.http.put<Channel>(url, { title: channel.title, post: channel.post }, this.userService.getAuthHeader()).toPromise()
    .then(() => {
      this.channel = channel
      return channel
    })
  }

  getChannelMessage(channel_hash: string): Promise<[ChannelMessage]>{
    const url = this.channelUrl + `/${channel_hash}/message`
    return this.http.get<[ChannelMessage]>(url, this.userService.getAuthHeader()).toPromise()
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      return Promise.resolve(result as T);
    };
  }

}
