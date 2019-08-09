import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  async getUser(userId: number): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/user/' + userId + '/fetchUser').toPromise();
  }

  async getUserJokes(userId: number): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/user/' + userId + '/getTopJokesPosted').toPromise();
  }

  async getFavoriteCategories(userId: number): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/user/' + userId + '/getFavoriteCategories').toPromise();
  }

  async getUserJokesCount(userId: number) {
    return await this.httpClient.get('http://localhost:3000/user/' + userId + '/userJokesCount').toPromise();
  }

  async getAverageOfJokesPosted(userId: number) {
    return await this.httpClient.get('http://localhost:3000/user/' + userId + '/averageOfJokesPosted').toPromise();
  }

  async login(user: any) {

    const res = await this.httpClient.post('http://localhost:3000/user/login', { user }).toPromise();

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
    const res = await this.httpClient.post('http://localhost:3000/user/register', { user }).toPromise();

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
}
