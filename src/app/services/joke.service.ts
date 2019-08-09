import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import serverConfig from '../serverConfig';

@Injectable({
  providedIn: 'root'
})
// this class will be used to handle functions related to jokes
export class JokeService {

  constructor(private readonly httpClient: HttpClient) {
  }

  async getJokesForCategory(category: string) {
    return await this.httpClient.get(serverConfig.serverURL + 'getJokesForCategory/' + category).toPromise();
  }

  async getCategories() {
    return await this.httpClient.get(serverConfig.serverURL + 'getCategories').toPromise();
  }

  async postJoke(userId: number, newJoke: any) {
    return await this.httpClient.post(serverConfig.serverURL + userId + '/postJoke', { newJoke }).toPromise();
  }
  async rateJoke(userId: number, newRate: any) {
    return await this.httpClient.post(serverConfig.serverURL + userId + '/rateJoke', { newRate }).toPromise();
  }

  async getTopOfTheMonth() {
    return await this.httpClient.get(serverConfig.serverURL + 'getTopTenOfMonth').toPromise();
  }

  async getTopOfTheYear() {
    return await this.httpClient.get(serverConfig.serverURL + 'getTopTenOfYear').toPromise();
  }

  async getTopOfAllTime() {
    return await this.httpClient.get(serverConfig.serverURL + 'getTopTenOfAllTime').toPromise();
  }

  async searchJokesByUsername(username) {
    return await this.httpClient.get(serverConfig.serverURL + 'getJokesForUsername/' + username).toPromise();
  }

  async getTenRandomJokes() {
    const res = await this.httpClient.get(serverConfig.serverURL + 'getTenRandomJokes').toPromise();
    return res;
  }

  async getUserHomeFeedJokes(userId: number) {
    const res = await this.httpClient.get(serverConfig.serverURL + userId + '/getHomeFeedJokes/').toPromise();
    return res;
  }

  async reportJoke(report: any) {
    return await this.httpClient.post(serverConfig.serverURL + 'report', { report }).toPromise();
  }
}
