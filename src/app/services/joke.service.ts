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

  async postJoke(newJoke: any) {
    return await this.httpClient.post('http://localhost:3000/user/1/postJoke', {newJoke}).toPromise();
  }
  async rateJoke(newRate: any) {
    return await this.httpClient.post('http://localhost:3000/user/1/rateJoke', {newRate}).toPromise();
  }
}
