import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  async getUserJokes(): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/user/1/getTopJokesPosted').toPromise();
  }

  async getFavoriteCategories(): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/user/1/getFavoriteCategories').toPromise();
  }


  async getUserJokesCount(userId: number) {
    return await this.httpClient.get('http://localhost:3000/user/1/userJokesCount').toPromise();
  }

  async getAverageOfJokesPosted() {
    return await this.httpClient.get('http://localhost:3000/user/1/averageOfJokesPosted').toPromise();
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

  // null if user not logged in. Otherwise a JSON represntation of user
  getLoggedInUser() {
    if (localStorage.getItem('user') !== null) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }
}
