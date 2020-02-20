import {UserService} from '../user.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;
  username;
  password;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.userService.getIdByName(this.username).subscribe(
      response => {
        this.user = response;
        if (this.password == this.user.password){
          this.router.navigate(["dashboard/"+this.user.id]);
        }else{
          alert('Invalid Credentials');
        }
      }
    );


  }

}
