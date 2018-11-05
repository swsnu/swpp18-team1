import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Channel } from '../model/channel';

import { User } from '../model/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private managerUrl: string = '/api/user';
  private userUrl: string = '/api/channel/:channel_id/user';

  user: User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(channel_id: number, user: Partial<User>): Promise<User> {
    return this.http.post<User>(this.userUrl.replace(":channel_id", channel_id.toString()), user, httpOptions)
    .toPromise()
    .then(user => this.user = user)
  }

  getChannel(manager_id): Promise<Channel> {
    return this.http.get<Channel>(`${this.managerUrl}/${manager_id}/channel`, httpOptions).toPromise() // turn Observable into Promise
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      console.error(error);
      return Promise.resolve(result as T);
    };
  }
}
