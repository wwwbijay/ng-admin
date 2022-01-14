import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

//Page components
import { AllUsersComponent } from './all-users/all-users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';

//layout components
import { UmNavComponent } from './layout/um-nav/um-nav.component';

//Dialogs components
import { CreateUserComponent } from './dialogs/create-user/create-user.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import { DeleteUserComponent } from './dialogs/delete-user/delete-user.component';
import { CreateRoleComponent } from './dialogs/create-role/create-role.component';
import { EditRoleComponent } from './dialogs/edit-role/edit-role.component';



@NgModule({
  declarations: [
    AllUsersComponent,
    UserRolesComponent,
    UmNavComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    CreateRoleComponent,
    EditRoleComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class UserManagementModule { }
