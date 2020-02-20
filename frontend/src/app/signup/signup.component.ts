import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name;
  username;
  password;
  res;

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {
  }

  add_user() {
    this.itemService.add_user(this.name, this.username, this.password).subscribe(
      response => {this.res = response;
      this.router.navigate(["login"]);
    },
      Error => {
          alert('Unable to add. Try again!')
      }
    );
  }

}
