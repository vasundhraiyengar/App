import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {
  }

  // GET id of user
  getIdByName(username) {
    return this.http
      .get('/api/get/userid/'+username)
  }

  getItemsById(id) {
    return this.http
      .get('/api/get/'+id)
  }

  deleteItemById(id) {
    return this.http
      .get('/api/delete/item/'+id)
  }

  addItem(name, user_id, description) {
    return this.http
      .post('/api/add/item', {
        "name": name,
        "user_id": user_id,
        "description": description
      })
  }

  addUser(name, username, password) {
    return this.http
      .post('/api/add/user', {
        "name": name,
        "username": username,
        "password": password
      })
  }

  editItem(id, name, description) {
    return this.http
      .post('/api/edit/item', {
        "id": id,
        "name": name,
        "description": description
      })
  }

  getItemDetails(id) {
    return this.http
      .get('/api/get/item/'+id)
  }

  duplicateItems(id) {
    return this.http
      .post('/api/duplicate/items', {
        "id":id
      })
  }

}
