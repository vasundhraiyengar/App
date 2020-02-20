import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  addUser() {
    this.userService.addUser(this.name, this.username, this.password).subscribe(
      response => {this.res = response;
      this.router.navigate(["login"]);
    },
      Error => {
          alert('Unable to add. Try again!')
      }
    );
  }

}
