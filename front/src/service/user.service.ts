import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../model/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userUrl: string = '/api/user';

    user: User;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

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

    createUser(article: Partial<User>): Promise<User> {
        return this.http.post<User>(this.userUrl, article, httpOptions)
            .toPromise()
            .then(user => this.user = user)
            .catch(this.handleError<User>('createUser()'));
    }

    updateUser(user: User): Promise<User> {
        const url = `${this.userUrl}/${user}`;
        return this.http.put(url, user, httpOptions)
            .toPromise()
            .then(() => {
                this.user = user;
            })
            .catch(this.handleError<any>('updateUser()'));
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Promise<T> => {
            console.error(error);
            return Promise.resolve(result as T);
        };
    }
}



