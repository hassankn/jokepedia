import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { JokeService } from '../services/joke.service';

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
  feedCategory: any = 'All The Jokes 😛';

  sortFilter: any = 'Hot';

  searchText: any = '';

  postJokeCategory: any = '';
  postJokeText: any = '';
  userLoggedIn: boolean;

  ngOnInit() {
    this.getHomeFeedJokes();
    this.getCategories();
    this.userLoggedIn = this.userService.getLoggedInUser();
  }

  async getCategories() {
    this.categories = await this.jokeService.getCategories();
    console.log(this.categories);
  }

  async getHomeFeedJokes() {

    if (this.userService.getLoggedInUser() == null) {
      this.jokes = await this.jokeService.getTenRandomJokes();
    } else {
      const userId = await this.userService.getLoggedInUser().userId;
      this.jokes = await this.jokeService.getUserHomeFeedJokes(userId);
    }
  }

  async postJoke() {
    if (this.postJokeText.length === 0 || this.postJokeCategory.length === 0) {
      alert('Please enter a joke and select a category first! :)');
    } else {
      const newJoke: any = {};
      newJoke.text = this.postJokeText;
      newJoke.categoryId = this.postJokeCategory;

      const userId = await this.userService.getLoggedInUser().userId;

      const res = await this.jokeService.postJoke(userId, newJoke);
      if (res['text'] === newJoke.text) {
        alert('Joke Inserted! :)');
      } else {
        alert('There was in issue inserting the joke :(');
      }
    }
  }


  async reportJoke(jokeId: number) {
    const userId = await this.userService.getLoggedInUser().userId;

    const report: any = {};
    report.jokeId = jokeId;
    report.userId = userId;
    const res = await this.jokeService.reportJoke(report);
    alert('You have reported this joke!');

  }

  async onCategoryChange() {
    this.jokes = await this.jokeService.getJokesForCategory(this.feedCategory);
  }

  async jokeRating(ratingScore: number, jokeId: number) {

    const rate: any = {};
    rate.jokeId = jokeId;
    rate.rating = ratingScore;
    console.log(ratingScore + ' ' + jokeId);

    const userId = await this.userService.getLoggedInUser().userId;

    const res = await this.jokeService.rateJoke(userId, rate);
    console.log(res);
    if (res['joke'].jokeId === jokeId && res['rating'] === ratingScore) {
      alert('Joke Rated! :)');
    } else {
      alert('There was in issue rating the joke :(');
    }

    this.getHomeFeedJokes();

  }

  async sortJokes(event) {
    console.log(event);
    switch (event.target.value) {
      case 'Hot':
        this.jokes = this.getHomeFeedJokes();
        break;
      case 'Month':
        this.jokes = await this.jokeService.getTopOfTheMonth();
        break;
      case 'Year':
        this.jokes = await this.jokeService.getTopOfTheYear();
        break;
      case 'AllTime':
        this.jokes = await this.jokeService.getTopOfAllTime();
    }
  }

  async searchByUserName() {
    this.jokes = await this.jokeService.searchJokesByUsername(this.searchText);
  }
}
