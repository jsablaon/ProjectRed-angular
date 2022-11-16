import { Injectable } from '@angular/core';

import {User} from './user';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  getUser(id: string): Observable<User> {
    return this.http.get<User>('http://localhost:3000/users/user/' + id);
  }

  updateUser(user: User): Observable<any> {
    //console.log(user.UserId);
    return this.http.put('http://localhost:3000/users/user/' + user.UserId, user);
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete<string>('http://localhost:3000/users/user/' + id);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users/user', user);
  }
}
