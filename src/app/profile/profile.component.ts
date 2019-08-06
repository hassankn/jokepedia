import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }


  userJokes = [];
  userJokesCount: any;
  userAverageOfJokesPosted: any;
  favoriteCategories = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('userId');
    console.log(id);
    this.getUserJokes(id);
    this.getUserJokesCount(id);
    this.getUserAverageRating(id);
    this.getFavoriteCategories(id);
  }

  async getUserJokes(id) {
    if (id === null) {
      this.userJokes = await this.userService.getUserJokes(this.userService.getLoggedInUser().userId);
    }
    this.userJokes = await this.userService.getUserJokes(id);
    console.log(this.userJokes);
  }

  async getFavoriteCategories(id) {
    if (id === null) {
      this.favoriteCategories = await this.userService.getFavoriteCategories(this.userService.getLoggedInUser().userId);
    }
    this.favoriteCategories = await this.userService.getFavoriteCategories(id);
    console.log(this.favoriteCategories);
  }

  async getUserJokesCount(id) {
    if (id === null) {
      this.userJokesCount = await this.userService.getUserJokesCount(this.userService.getLoggedInUser().userId);
    }
    this.userJokesCount = await this.userService.getUserJokesCount(id);
  }

  async getUserAverageRating(id) {
    if (id === null) {
      this.userAverageOfJokesPosted = await this.userService.getAverageOfJokesPosted(this.userService.getLoggedInUser().userId);
    }
    this.userAverageOfJokesPosted = await this.userService.getAverageOfJokesPosted(id);
  }
}
