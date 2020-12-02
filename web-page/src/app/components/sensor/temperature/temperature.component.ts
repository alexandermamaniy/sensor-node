import { Component, OnInit } from '@angular/core';
import { TemperatureService } from 'src/app/services/temperature.service';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {


  user: any;
  temps: [any];
  isAuthenticated: boolean;

  constructor( private temperatureService:TemperatureService ) { }

  ngOnInit() {
    if(localStorage.getItem('Authorization')){
      this.isAuthenticated = true;
      this.user = JSON.parse(atob(localStorage.getItem('Authorization').split('.')[1])).user;
   
      this.temperatureService.getAll()
        .subscribe(resp => {
          console.log( 'regreps' +  resp['temps']);
          this.temps = resp['temps']
        }, err => {
          console.log(  err);
          
        })

    } else {
      this.isAuthenticated = false;
      this.user = undefined 
    }
  }

}
