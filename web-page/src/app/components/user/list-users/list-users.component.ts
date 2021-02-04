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

  userForm2: FormGroup;

  constructor( 
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

      this.userForm2 = this.formBuilder.group({
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
    this.userForm2 = this.formBuilder.group({
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
    const ci = /^\d{5,7}[\ ]+[A-Za-z]+$/gm;
    const regexAlfabetoNom = /^[a-zA-Z\ ]+$/gm;
    const regexAlfabetoPat = /^[a-zA-Z\ ]+$/gm;
    const regexAlfabetoMat = /^[a-zA-Z\ ]+$/gm;
    const regexAlfabeNumericoEspacios = /^[0-9A-Za-z\ \,\#\.]+$/gm;
    const celular = /^\d{5,8}$/gm;
    const correo = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const username = /^[A-Za-z0-9]+$/gm;
    const password = /^.{7,}$/gm;
    
    let baseRoot = document.getElementById('userForm2');
    
    let ciBad = baseRoot.querySelector("#ciBad");
    let nameBad = baseRoot.querySelector("#nameBad");
    let lastnameBad = baseRoot.querySelector("#lastnameBad");
    let surnameBad = baseRoot.querySelector("#surnameBad");
    let emailBad = baseRoot.querySelector("#emailBad");
    let addressBad = baseRoot.querySelector("#addressBad");
    let cellphoneBad = baseRoot.querySelector("#cellphoneBad");
    let usernameBad = baseRoot.querySelector("#usernameBad");
    let passwordBad = baseRoot.querySelector("#passwordBad");
    
    let isValidci=false;
    let isValidname=false;
    let isValidlastname=false;
    let isValidsurname=false;
    let isValidemail=false;
    let isValidaddress=false;
    let isValidcellphone=false;
    let isValidusername=false;
    let isValidpassword=false;

    if(ci.test(userData.ci)){
      ciBad.innerHTML = "Campo CI debe ser unico y de 5 a 7 digitos y extension: \"123456 Cbba\"";
      ciBad['style'].display = "none";
      isValidci=true;
    } else {
      ciBad['style'].display = "block";
    }


    if(regexAlfabetoNom.test(userData.name)){
      nameBad['style'].display = "none";
      isValidname=true;
    } else {
      nameBad['style'].display = "block";
    }

    if(regexAlfabetoPat.test(userData.lastname)){
      lastnameBad['style'].display = "none";
      isValidlastname=true;
    } else {
      lastnameBad['style'].display = "block";
    }

    if(regexAlfabetoMat.test(userData.surname)){
      surnameBad['style'].display = "none";
      isValidsurname=true;
    } else {
      surnameBad['style'].display = "block";
    }

    if(correo.test(userData.email)){
      emailBad['style'].display = "none";
      isValidemail=true;
    } else {
      emailBad['style'].display = "block";
    }

    if(regexAlfabeNumericoEspacios.test(userData.address)){
      addressBad['style'].display = "none";
      isValidaddress=true;
    } else {
      addressBad['style'].display = "block";
    }

    if(celular.test(userData.cellphone)){
      cellphoneBad['style'].display = "none";
      isValidcellphone=true;
    } else {
      cellphoneBad['style'].display = "block";
    }

    if(username.test(userData.username)){
      usernameBad['style'].display = "none";
      isValidusername=true;
    } else {
      usernameBad['style'].display = "block";
    }

    if(password.test(userData.password)){
      passwordBad['style'].display = "none";
      isValidpassword=true;
    } else {
      passwordBad['style'].display = "block";
    }

    let isValid = isValidci && isValidname && isValidlastname && isValidsurname && isValidemail && isValidaddress && isValidcellphone && isValidusername && isValidpassword;
    
    if(isValid){

      this.userService.update(this.userIdUpdate, userData)
      .subscribe(resp => {
        $('#editEmployeeModal').modal('hide');
        this.router.navigateByUrl('/sample', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/users"]));
      }, err => {
        if (err.error.err.code == 'ER_DUP_ENTRY') {
          isValidci = false;
          ciBad.innerHTML = "El ci " + userData.ci + " ya se encuetra registrado.";
          ciBad['style'].display = "block";
        }
        console.log("este es el error2: ",err.error);
        console.log("este es el error: ",err.error.err.code);
      });
    }

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
