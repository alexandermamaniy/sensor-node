import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() public userId: any;


  constructor() {
    console.log('hola', this.userId);
  }

  ngOnInit() {
    
  }

}
