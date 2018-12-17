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
  private personUrl: string = environment.apiUrl + '/api/person';
  private peopleUrl: string = environment.apiUrl + '/api/people';


  token: string;
  user: User = new User;
  error = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    public cookieService: CookieService,
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

  getAuthHeader(): object {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token})
    }
  }

  // for user
  createUser(channel_id: number, user: Partial<User>): Promise<User> {
    return this.http.post<User>(this.userUrl.replace(":channel_id", channel_id.toString()), user, httpOptions)
    .toPromise()
    .then(response => {
      this.token = response["token"];
      this.cookieService.set("token", response["token"], undefined, "/");
      this.setUserFrom(this.token);
    })
    .catch(this.handleError<any>('createUser()'));
  }

  userSignOut(channel_hash: number): void {
    this.cookieService.deleteAll("/");
    this.router.navigate([`access/${channel_hash}`]);
  }

  // for manager
  managerSignIn(user: Partial<User>): void {
    const url = `${this.managerUrl}/signin`;
    this.http.post(url, user, httpOptions)
    .toPromise()
    .then(response => {
      this.token = response["token"];
      this.cookieService.set("token", response["token"], undefined, "/");
      this.setUserFrom(this.token);
      this.router.navigate(['/main']);
      this.error = "";
    })
    .catch((e) => {
      if(e && e.status === 401){
        this.error = "FAIL_SIGNIN";
      }
    });
  }

  managerSignUp(user: Partial<User>): void {
    const url = `${this.managerUrl}/signup`;
    this.http.post(url, user, httpOptions)
      .toPromise()
      .then(response => {
        this.token = response["token"];
        this.cookieService.set("token", response["token"], undefined, "/");
        this.setUserFrom(this.token);
        this.error = "";
        this.router.navigate(['/main']);
      })
    .catch((e) => {
      if(e && e.status === 409){
        this.error = "USERNAME_UNIQUE";
      }
      //this.handleError<any>('managerSignUp()')
    });
  }

  managerSignOut(): void {
    this.cookieService.deleteAll("/");
    this.router.navigate(['/signin']);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      console.error(error);
      return Promise.resolve(result as T);
    };
  }
}
