import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';


@NgModule({
  declarations: [
    AllUsersComponent,
    UserRolesComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
