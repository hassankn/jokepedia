import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { JokeService } from '../services/joke.service';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private jokeService: JokeService,
  ) { }

  jokes: any = [];
  feedCategory: any ='';

  ngOnInit() {
    this.getHomeFeedJokes();
    this.getCategories();
  }

  async getCategories() {

    // this.jokes = await 
  }

  async getHomeFeedJokes() {
    this.jokes = await this.userService.getTenRandomJokes();

    this.jokes = this.jokes.map((joke: any) => ({
      ...joke,
      relativeTime: moment(joke.timeStamp).format('MMMM Do YYYY, h:mm a'),
    }));

    console.log(this.jokes);

  }

  onCategoryChange(value) {
    this.jokes = this.jokeService.getJokesForCategory(value);
  }



}
