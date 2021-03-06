import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    public router: Router
  ) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  async login() {
    const user = { username: this.username, password: this.password };

    await this.userService.login(user);

    if (this.userService.getLoggedInUser() !== null) {
      this.router.navigate(['/home']);
    }
  }

}
