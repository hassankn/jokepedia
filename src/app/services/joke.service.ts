import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

// this class will be used to handle functions related to jokes
export class JokeService {

  constructor(private readonly httpClient: HttpClient) {
  }

  
}
