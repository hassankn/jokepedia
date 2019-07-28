import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  async getUserJokes(): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/user/1/userjokes').toPromise();
  }
}
