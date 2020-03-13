import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { SampleComponent } from './sample/sample.component';

const routes: Routes = [
  { 
    path: 'users', 
    component: ListUsersComponent
  },
  { 
    path: 'sample', 
    component: SampleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class UserRoutingModule { }
