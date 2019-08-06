import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  userJokes = [];
  userJokesCount: any;
  userAverageOfJokesPosted: any;
  favoriteCategories = [];

  ngOnInit() {
    this.getUserJokes();
    this.getUserJokesCount();
    this.getUserAverageRating();
    this.getFavoriteCategories();
  }

  async getUserJokes() {
    this.userJokes = await this.userService.getUserJokes();
    console.log(this.userJokes);
  }

  async getFavoriteCategories() {
    this.favoriteCategories = await this.userService.getFavoriteCategories();
    console.log(this.favoriteCategories);
  }

  async getUserJokesCount() {
    this.userJokesCount = await this.userService.getUserJokesCount(1);
  }

  async getUserAverageRating() {
    this.userAverageOfJokesPosted = await this.userService.getAverageOfJokesPosted();
  }
}
