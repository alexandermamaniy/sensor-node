import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
  }

  createUser(userData) {
    this.userService.create(userData)
      .subscribe(resp => {
        $('#addEmployeeModal').modal('hide');
        this.router.navigateByUrl('/sample', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/users"]));
      }, err => {
        console.log(err);
      });
  }

}
