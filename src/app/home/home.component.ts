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
  categories: any = [];
  feedCategory: any = '';

  postJokeCategory: any = '';
  postJokeText: any = '';


  ngOnInit() {
    this.getHomeFeedJokes();
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.jokeService.getCategories();
    console.log(this.categories);
  }

  async getHomeFeedJokes() {
    this.jokes = await this.userService.getTenRandomJokes();

    this.jokes = this.jokes.map((joke: any) => ({
      ...joke,
      relativeTime: moment(joke.timeStamp).format('MMMM Do YYYY, h:mm a'),
    }));

    console.log(this.jokes);
  }

  async postJoke() {
    const newJoke: any = {};
    newJoke.text = this.postJokeText;
    newJoke.categoryId = this.postJokeCategory;

    const res = await this.jokeService.postJoke(newJoke);
    if (res['text'] === newJoke.text) {
      alert('Joke Inserted! :)');
    } else {
      alert('There was in issue inserting the joke :(');
    }
  }

  async onCategoryChange() {
    this.jokes = await this.jokeService.getJokesForCategory(this.feedCategory);
  }

  async jokeRating(ratingScore: number, jokeId: number) {

    const rate: any = {};
    rate.jokeId = jokeId;
    rate.rating = ratingScore;
    console.log(ratingScore + ' ' + jokeId);

    const res = await this.jokeService.rateJoke(rate);
    console.log(res);
    if (res['joke'].jokeId === jokeId && res['rating'] === ratingScore) {
      alert('Joke Rated! :)');
    } else {
      alert('There was in issue rating the joke :(');
    }

  }
}
