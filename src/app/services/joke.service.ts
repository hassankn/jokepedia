import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
// this class will be used to handle functions related to jokes
export class JokeService {

  constructor(private readonly httpClient: HttpClient) {
  }

  async getJokesForCategory(category: string) {
    return await this.httpClient.get('http://localhost:3000/user/getJokesForCategory/' + category).toPromise();
  }

  async getCategories() {
    return await this.httpClient.get('http://localhost:3000/user/getCategories').toPromise();
  }

  async postJoke(userId: number, newJoke: any) {
    return await this.httpClient.post('http://localhost:3000/user/' + userId + '/postJoke', {newJoke}).toPromise();
  }
  async rateJoke(userId: number, newRate: any) {
    return await this.httpClient.post('http://localhost:3000/user/' + userId + '/rateJoke', {newRate}).toPromise();
  }

  async getTopOfTheMonth(){
    return await this.httpClient.get('http://localhost:3000/user/getTopTenOfMonth').toPromise();
  }

  async getTopOfTheYear(){
    return await this.httpClient.get('http://localhost:3000/user/getTopTenOfYear').toPromise();
  }

  async getTopOfAllTime(){
    return await this.httpClient.get('http://localhost:3000/user/getTopTenOfAllTime').toPromise();
  }

  async searchJokesByUsername(username) {
    return await this.httpClient.get('http://localhost:3000/user/getJokesForUsername/' + username).toPromise();
  }

  async getTenRandomJokes() {
    const res = await this.httpClient.get('http://localhost:3000/user/getTenRandomJokes').toPromise();
    return res;
  }

  async getUserHomeFeedJokes(userId: number) {
    const res =  await this.httpClient.get('http://localhost:3000/user/' + userId + '/getHomeFeedJokes/').toPromise();
    return res;
  }
}
