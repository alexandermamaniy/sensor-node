import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  url: string ;

  constructor(private http: HttpClient) {
    this.url = `${environment.serverUrl}/temperature`;
  }

  getAll(){
    let header = localStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': header
      })
    };

    return this.http.get(this.url, httpOptions);
  }

}
