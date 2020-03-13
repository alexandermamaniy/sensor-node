import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutForm: FormGroup;
  
  @Output()
  isLogin = new EventEmitter<boolean>();


  constructor( private formBuilder: FormBuilder, private loginService: LoginService ) { 
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
    // peticion service
  }

  login(customerData){
    this.loginService.login(customerData)
      .subscribe((resp) => {
        localStorage.setItem('Authorization', resp['token'])
        this.isLogin.emit(true);
        this.checkoutForm.reset()
      }, (err) => {
        this.isLogin.emit(false);
      })
      $('#myModal').modal('hide');
  }

  logout(){
    localStorage.removeItem('Authorization')
  }
}
