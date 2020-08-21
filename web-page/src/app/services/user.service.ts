import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url: string ;

  constructor(private http: HttpClient) {
    this.url = `${environment.serverUrl}/user`;
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

  get(id:string){
    let header = localStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': header
      })
    };
    return this.http.get(`${this.url}/${id}`, httpOptions);
  }

  create(user: any){
    let header = localStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': header
      })
    };

    return this.http.post(this.url, user, httpOptions);
  }

  update(id: string, user:any){

    let header = localStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': header
      })
    };

    return this.http.put(`${this.url}/${id}`, user, httpOptions );
  }

  delete(id: string){
    let header = localStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': header
      })
    };

    return this.http.delete(`${this.url}/${id}`, httpOptions);
  }

}
