import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jokepedia';
  loggedIn: boolean;

  constructor(private userService: UserService) {
    this.loggedIn = false;
  }

  getLoggedInUser() {
    return this.userService.getLoggedInUser();
  }

  logout() {
    this.userService.logout();
  }

  ngOnInit(): void {
    if(this.getLoggedInUser()) {
      console.log("A user is logged in")
      this.loggedIn = true;
    }
  }
}
