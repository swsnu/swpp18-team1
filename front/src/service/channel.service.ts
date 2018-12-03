import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

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
    private userService: UserService
  ) { }

  getChannel(id: number): Promise<Channel> {
    const url = `${this.channelUrl}/${id}`;
    return this.http.get<Channel>(url)
    .toPromise()
    .then(channel => {
      this.channel = channel
      return channel
    })
    .catch(this.handleError<Channel>(`getChannel()`));
  }

  getChannelByManager(): Promise<Channel> {
    const url = environment.apiUrl + `/api/manager/channel`;
    return this.http.get<Channel>(url, this.userService.getAuthHeader())
    .toPromise()
    .then(channel => {
      this.channel = channel;
      return channel
    }
    )
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

<<<<<<< HEAD
  update(channel: Channel): Promise<Channel>{
    const url = this.channelUrl + `/${channel.id}`
    return this.http.put<Channel>(url, { title: channel.title, post: channel.post }, this.userService.getAuthHeader()).toPromise()
    .then(() => {
      this.channel = channel
      return channel
    })
  }

=======
>>>>>>> origin
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
