import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private myAppURL: string = 'http://localhost:3001/';
  private myAPI_URL: string = 'users/';
  private http = inject(HttpClient);

  constructor() {}

  signIn(user: User): Observable<any> {
    const url: string = `${this.myAppURL}${this.myAPI_URL}`;

    return this.http.post(url, user);
  }

  login(user: User): Observable<any>{
    return this.http.post<string>(`${this.myAppURL}${this.myAPI_URL}/login`, user)
  }

}
