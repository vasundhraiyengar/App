import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(name, username, password) {
    return this.http
      .post('/api/add/user', {
        "name": name,
        "username": username,
        "password": password
      })
  }

  // GET id of user
  getIdByName(username) {
    return this.http
      .get('/api/get/userid/'+username)
  }
}
