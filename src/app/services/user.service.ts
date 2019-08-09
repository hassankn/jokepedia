import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import serverConfig from '../serverConfig';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  async getUser(userId: number): Promise<any> {
    return await this.httpClient.get(serverConfig.serverURL + userId + '/fetchUser').toPromise();
  }

  async getUserJokes(userId: number): Promise<any> {
    return await this.httpClient.get(serverConfig.serverURL + userId + '/getTopJokesPosted').toPromise();
  }

  async getFavoriteCategories(userId: number): Promise<any> {
    return await this.httpClient.get(serverConfig.serverURL + userId + '/getFavoriteCategories').toPromise();
  }

  async getUserJokesCount(userId: number) {
    return await this.httpClient.get(serverConfig.serverURL + userId + '/userJokesCount').toPromise();
  }

  async getAverageOfJokesPosted(userId: number) {
    return await this.httpClient.get(serverConfig.serverURL + userId + '/averageOfJokesPosted').toPromise();
  }

  async getFollowers(userId: number) {
    return await this.httpClient.get(serverConfig.serverURL + userId + '/followers').toPromise();
  }

  async getFollowees(userId: number) {
    return await this.httpClient.get(serverConfig.serverURL + userId + '/followees').toPromise();
  }

  async login(user: any) {

    const res = await this.httpClient.post(serverConfig.serverURL + 'login', { user }).toPromise();

    if (res === null) {
      alert('Invalid username/password');
    } else {
      localStorage.setItem('user', JSON.stringify(res));
    }
  }

  logout() {
    localStorage.clear();
  }

  async register(user: any) {
    const res = await this.httpClient.post(serverConfig.serverURL + 'register', { user }).toPromise();

    console.log(res);

    if (res === null) {
      alert('This username is already taken! Please use a different username :)');
    } else {
      localStorage.setItem('user', JSON.stringify(res));
    }
  }

  // null if user not logged in. Otherwise a JSON represntation of user
  getLoggedInUser() {
    if (localStorage.getItem('user') !== null) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }

  async followUser(followerId, followeeId) {
    await this.httpClient.post(serverConfig.serverURL + 'followUser',
      {
        followerId,
        followeeId
      }).toPromise();
  }

  async unfollowUser(followerId, followeeId) {
    await this.httpClient.post(serverConfig.serverURL + 'unfollowUser',
      {
        followerId,
        followeeId
      }).toPromise();
  }
}
