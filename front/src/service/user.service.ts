import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

import { User } from '../model/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private managerUrl: string = environment.apiUrl + '/api/manager';
  private userUrl: string = environment.apiUrl + '/api/channel/:channel_id/user';

  token: string;

  user: User = new User;
  users: User[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  isSignIn(): boolean {
    const token = this.cookieService.get("token");
    if(token) {
      this.token = token;
      this.setUserFrom(token);
      return true;
    } else {
      return false;
    }
  }

  setUserFrom(token): void {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const decodedToken = JSON.parse(window.atob(base64));
    this.user.id = decodedToken["id"];
    this.user.username = decodedToken["username"];
  }

  // for user
  createUser(channel_id: number, user: Partial<User>): Promise<User> {
    return this.http.post<User>(this.userUrl.replace(":channel_id", channel_id.toString()), user, httpOptions)
    .toPromise()
    .then(user => {
      this.user = user
      this.token = user["token"];
      this.cookieService.set("token", user["token"]);
      this.setUserFrom(this.token);
    })
    .catch(this.handleError<any>('createUser()'));
  }

  // for manager
  managerSignIn(user: Partial<User>): void {
    const url = `${this.managerUrl}/signin`;
    this.http.post(url, user, httpOptions)
      .toPromise()
      .then(response => {
        this.token = response["token"];
        this.cookieService.set("token", response["token"]);
        this.setUserFrom(this.token);
        this.router.navigate(['/main']);
      })
      .catch(this.handleError<any>('confirmUser()'));
  }

  managerSignUp(user: Partial<User>): void {
    const url = `${this.managerUrl}/signup`;
    this.http.post(url, user, httpOptions)
      .toPromise()
      .then(response => {
        this.token = response["token"];
        this.cookieService.set("token", response["token"]);
        this.setUserFrom(this.token);
        this.router.navigate(['/main']);
      })
      .catch(this.handleError<any>('confirmUser()'));
  }

  managerSignOut(): void {
    this.cookieService.delete("token", this.token);
    this.router.navigate(['/signin']);
  }

  userSignOut(channel_id: number): void {
    this.cookieService.delete("token", this.token);
    this.router.navigate([`access/${channel_id}`]);
  }

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .toPromise()
      .catch(this.handleError('getUsers()'));
  }

  getUser(id: number): Promise<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url)
      .toPromise()
      .catch(this.handleError<User>(`getUser()`));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      console.error(error);
      return Promise.resolve(result as T);
    };
  }
}
