import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemperatureComponent } from './components/sensor/temperature/temperature.component';
import { HumidityComponent } from './components/sensor/humidity/humidity.component';


const routes: Routes = [
  { 
    path: 'temp', 
    component: TemperatureComponent
  },
  { 
    path: 'hum', 
    component: HumidityComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
