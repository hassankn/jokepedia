import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  username: string;
  password: string;
  email: string;
  name: string;

  ngOnInit() {
  }

  async register() {
    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
      name: this.name
    };

    if (
      user.username === undefined ||
      user.password === undefined ||
      user.email === undefined ||
      user.name === undefined
    ) {
      alert('No fields can be empty!');
    } else {

      await this.userService.register(user);
      if (this.userService.getLoggedInUser() !== null) {
        this.router.navigate(['/home']);
      }
    }
  }
}
