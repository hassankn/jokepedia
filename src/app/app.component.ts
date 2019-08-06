import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jokepedia';

  constructor(private userService: UserService) {}

  getLoggedInUser() {
    return this.userService.getLoggedInUser();
  }

  logout() {
    this.userService.logout();
  }
}
