import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermanagementRoutingModule } from './usermanagement-routing.module';
import { UsermanagementComponent } from './usermanagement.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';


@NgModule({
  declarations: [
    UsermanagementComponent,
    AddUserComponent,
    ViewUserComponent,
    EditRegistrationComponent,
  ],
  imports: [
    CommonModule,
    UsermanagementRoutingModule,
    AngularMaterialModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectFilterModule,
    SharedModule
  ]
})
export class UsermanagementModule { }
