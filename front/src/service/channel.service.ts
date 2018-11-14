import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Channel } from '../model/channel';
import { UserService } from 'src/service/user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelUrl: string = environment.apiUrl + '/api/channel';

  channel: Channel;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getChannel(id: number): Promise<Channel> {
    const url = `${this.channelUrl}/${id}`;
    return this.http.get<Channel>(url)
        .toPromise()
        .then(channel => this.channel = channel)
        .catch(this.handleError<Channel>(`getChannel()`));
  }

  getChannelByManager(): Promise<Channel> {
    const httpOptionsWithAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.userService.token})
    };

    const url = environment.apiUrl + `/api/manager/channel`;
    return this.http.get<Channel>(url, httpOptionsWithAuth)
        .toPromise()
        .then(channel => {
            this.channel = channel;
            return channel
          }
        )
  }

  create(title: string): Promise<Channel>{
    const httpOptionsWithAuth = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.userService.token})
    };
    return this.http.post<Channel>(this.channelUrl, { title } , httpOptionsWithAuth).toPromise()
    .then(channel =>{
        this.channel = channel
        return channel
    })
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      return Promise.resolve(result as T);
    };
  }
}
