import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  user: string;
  userJokes = [];
  userJokesCount: any;
  userAverageOfJokesPosted: any;
  favoriteCategories = [];

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('userId');
    console.log(id);
    if (id === null) {
      id = this.userService.getLoggedInUser().userId;
    }
    this.getUser(id);
    this.getUserJokes(id);
    this.getUserJokesCount(id);
    this.getUserAverageRating(id);
    this.getFavoriteCategories(id);
  }

  async getUser(id) {
    this.user = await this.userService.getUser(id);
    this.user = this.user[0];
    console.log(this.user);
  }

  async getUserJokes(id) {
    this.userJokes = await this.userService.getUserJokes(id);
    console.log('USER JOKES');
    console.log(this.userJokes);
  }

  async getFavoriteCategories(id) {
    this.favoriteCategories = await this.userService.getFavoriteCategories(id);
    console.log(this.favoriteCategories);
  }

  async getUserJokesCount(id) {

    this.userJokesCount = await this.userService.getUserJokesCount(id);
  }

  async getUserAverageRating(id) {
    this.userAverageOfJokesPosted = await this.userService.getAverageOfJokesPosted(id);
  }
}
