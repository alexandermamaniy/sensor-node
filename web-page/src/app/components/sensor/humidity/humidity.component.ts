import { Component, OnInit } from '@angular/core';
import { HumidityService } from 'src/app/services/humidity.service';


@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {


  user: any;
  humidities: [any];
  isAuthenticated: boolean;

  constructor( private humidityService:HumidityService ) { }

  ngOnInit() {
    if(localStorage.getItem('Authorization')){
      this.isAuthenticated = true;
      this.user = JSON.parse(atob(localStorage.getItem('Authorization').split('.')[1])).user;
   
      this.humidityService.getAll()
        .subscribe(resp => {
          console.log(resp)
          this.humidities = resp['humidities']
        }, err => {

        })

    } else {
      this.isAuthenticated = false;
      this.user = undefined 
    }
  }

}
