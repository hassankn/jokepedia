import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  async login() {
    const user = {username: this.username, password: this.password};

    this.userService.login(user);
  }

}
