import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  user: any;
  users: [any];
  isAuthenticated: boolean;

  userIdDelete: any;
  userIdUpdate: any;

  userForm: FormGroup;

  constructor( 
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

      this.userForm = this.formBuilder.group({
        ci: '',
        name: '',
        lastname: '',
        surname: '',
        email: '',
        cellphone: '',
        address: '',
        username: '',
        password: '',
      });
    }

  ngOnInit() {
    if(localStorage.getItem('Authorization')){
      this.isAuthenticated = true;
      this.user = JSON.parse(atob(localStorage.getItem('Authorization').split('.')[1])).user;
      this.userService.getAll()
        .subscribe((resp) => {
          this.users = resp['users'];
          console.log('estos son los usuario : ',this.users)
        }, (error) => {
          console.log(error);
        });
    } else {
      this.isAuthenticated = false;
      this.user = undefined 
    }
  }

  updateUser(id){

    this.userIdUpdate = id;

    let userEncontrado = this.users.filter(user => user.id==id)[0];
    console.log(userEncontrado)
    this.userForm = this.formBuilder.group({
      ci: userEncontrado.ci,
      name: userEncontrado.name,
      lastname: userEncontrado.lastname,
      surname: userEncontrado.surname,
      email: userEncontrado.email,
      cellphone: userEncontrado.cellphone,
      address: userEncontrado.address,
      username: userEncontrado.username,
      password: userEncontrado.password,
    });

  }

  updateUserButton(userData){
    this.userService.update(this.userIdUpdate, userData)
      .subscribe(resp => {
        $('#editEmployeeModal').modal('hide');
        this.router.navigateByUrl('/sample', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/users"]));
      }, err => {
        console.log(err);
      });
  }

  deleteUser(id) {
    console.log(id)
    this.userIdDelete = id;
  }

  deleteUserButton(){
    // console.log(this.userIdDelete)
    this.userService.delete(this.userIdDelete)
      .subscribe(resp => {
        $('#deleteEmployeeModal').modal('hide');
        this.router.navigateByUrl('/sample', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/users"]));
      }, err => {
        console.log(err);
      });
  }

}
