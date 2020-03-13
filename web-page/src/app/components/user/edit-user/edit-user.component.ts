import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

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

  updateUser(userData) {
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
