import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {
  }

  // GET id of user
  get_id_by_name(username) {
    return this.http
      .get('/api/get/userid/'+username)
  }

  get_items_by_id(id) {
    return this.http
      .get('/api/get/'+id)
  }

  delete_item_by_id(id) {
    return this.http
      .get('/api/delete/item/'+id)
  }

  add_item(name, user_id, description) {
    return this.http
      .post('/api/add/item', {
        "name": name,
        "user_id": user_id,
        "description": description
      })
  }

  add_user(name, username, password) {
    return this.http
      .post('/api/add/user', {
        "name": name,
        "username": username,
        "password": password
      })
  }

  edit_item(id, name, description) {
    return this.http
      .post('/api/edit/item', {
        "id": id,
        "name": name,
        "description": description
      })
  }

  get_item_details(id) {
    return this.http
      .get('/api/get/item/'+id)
  }

  duplicate_items(id) {
    return this.http
      .post('/api/duplicate/items', {
        "id":id
      })
  }

}
