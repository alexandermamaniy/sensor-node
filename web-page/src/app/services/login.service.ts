import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string ;

  constructor(private http: HttpClient) {
    this.url = `${environment.serverUrl}/login`;
   }

  login(customData: any){
    return this.http.post(this.url, customData)
  }

}
