import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';

import { UserModule } from './components/user/user.module';
import { LoginComponent } from './components/login/login.component';
import { TemperatureComponent } from './components/sensor/temperature/temperature.component';
import { HumidityComponent } from './components/sensor/humidity/humidity.component';
import { AngularPaginatorModule } from 'angular-paginator';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TemperatureComponent,
    HumidityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
