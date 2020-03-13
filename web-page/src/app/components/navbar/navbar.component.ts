import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  isAuthenticated: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('Authorization')){
      this.isAuthenticated = true;
      this.user = JSON.parse(atob(localStorage.getItem('Authorization').split('.')[1])).user;

      if(this.user.role == 'ADMIN_ROLE'){
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.isAuthenticated = false;
      this.user = undefined 
      this.router.navigate(['/']);
    }
  }

  login(event){
    this.isAuthenticated = event;
    if(localStorage.getItem('Authorization')){
      this.user = JSON.parse(atob(localStorage.getItem('Authorization').split('.')[1])).user
      console.log(this.user)

      if(this.user.role == 'ADMIN_ROLE'){
        this.router.navigate(['/users']);
      }
    } else {
      this.user = undefined 
    }
  }

  logout(){
    localStorage.removeItem('Authorization')
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }
}
