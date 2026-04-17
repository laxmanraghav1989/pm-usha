import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailManagementRoutingModule } from './email-management-routing.module';
import { EmailManagementComponent } from './email-management.component';
import { EmailManagementSubmitComponent } from './email-management-submit/email-management-submit.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    EmailManagementComponent,
    EmailManagementSubmitComponent
  ],
  imports: [
    CommonModule,
    EmailManagementRoutingModule,
        AngularMaterialModule,FormsModule,ReactiveFormsModule,MatSelectFilterModule,AngularEditorModule
  ]
})
export class EmailManagementModule { }
